// 站点自检：用 Edge 的 DevTools 协议截图 + 跑几条交互断言。
// 用法：先 pnpm start（3210），再 node scripts/verify-ui.mjs
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const EDGE =
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9333;
const BASE = 'http://127.0.0.1:3210';
const OUT = path.join(process.cwd(), 'screenshots');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      const slot = msg.id && this.pending.get(msg.id);
      if (!slot) return;
      this.pending.delete(msg.id);
      if (msg.error) slot.reject(new Error(`${msg.error.message}`));
      else slot.resolve(msg.result);
    });
  }

  send(method, params = {}, sessionId) {
    const id = ++this.id;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    this.ws.send(JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.delete(id)) reject(new Error(`timeout: ${method}`));
      }, 30000);
    });
  }
}

async function waitForDevtools() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return await res.json();
    } catch {
      /* 还没起来 */
    }
    await sleep(250);
  }
  throw new Error('DevTools 端口没起来');
}

class Page {
  constructor(cdp) {
    this.cdp = cdp;
  }

  async init() {
    const { targetId } = await this.cdp.send('Target.createTarget', {
      url: 'about:blank',
    });
    const { sessionId } = await this.cdp.send('Target.attachToTarget', {
      targetId,
      flatten: true,
    });
    this.sessionId = sessionId;
    await this.cdp.send('Page.enable', {}, sessionId);
    await this.cdp.send('Runtime.enable', {}, sessionId);
  }

  async evaluate(expression) {
    const { result } = await this.cdp.send(
      'Runtime.evaluate',
      { expression, returnByValue: true, awaitPromise: true },
      this.sessionId,
    );
    if (result.subtype === 'error') throw new Error(result.description);
    return result.value;
  }

  async viewport(width, height) {
    await this.cdp.send(
      'Emulation.setDeviceMetricsOverride',
      { width, height, deviceScaleFactor: 1, mobile: width < 700 },
      this.sessionId,
    );
  }

  async goto(url) {
    await this.cdp.send('Page.navigate', { url }, this.sessionId);
    for (let i = 0; i < 80; i += 1) {
      try {
        const ready = await this.evaluate('document.readyState');
        if (ready === 'complete') break;
      } catch {
        /* 导航过程中执行上下文会短暂失效 */
      }
      await sleep(120);
    }
    await sleep(900); // 等 hydration 与首屏动效落定
  }

  async scrollTo(expression) {
    await this.evaluate(`(() => { const t = ${expression}; window.scrollTo(0, t); return t; })()`);
    await sleep(900);
  }

  async shot(name) {
    const { data } = await this.cdp.send(
      'Page.captureScreenshot',
      { format: 'png', captureBeyondViewport: false },
      this.sessionId,
    );
    fs.writeFileSync(path.join(OUT, `${name}.png`), Buffer.from(data, 'base64'));
    return `${name}.png`;
  }

  async pressEscape() {
    for (const type of ['keyDown', 'keyUp']) {
      await this.cdp.send(
        'Input.dispatchKeyEvent',
        { type, key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 },
        this.sessionId,
      );
    }
    await sleep(700);
  }
}

const report = [];
const check = (name, ok, detail = '') => {
  report.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-edge-'));
  const edge = spawn(
    EDGE,
    [
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${userDataDir}`,
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  try {
    const version = await waitForDevtools();
    const ws = new WebSocket(version.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', reject, { once: true });
    });

    const cdp = new CDP(ws);
    const page = new Page(cdp);
    await page.init();

    // ---- 桌面 1440 ----
    await page.viewport(1440, 900);
    await page.goto(`${BASE}/`);
    check('首页标题', (await page.evaluate('document.title')).includes('Elia'));
    await page.shot('01-home-1440-top');

    const heroName = await page.evaluate(
      "getComputedStyle(document.querySelector('.hero__name h1')).fontSize",
    );
    check('Hero 标题字号足够大', parseFloat(heroName) >= 72, heroName);

    await page.scrollTo("document.querySelectorAll('.scene')[0].offsetTop + window.innerHeight * 1.1");
    await page.shot('02-home-scene-storyboard');
    const beat = await page.evaluate(
      "document.querySelectorAll('.scene')[0].querySelector('.beat[data-active=\"true\"] .beat__label')?.textContent || ''",
    );
    check('滚动叙事切到了某一拍', beat.length > 0, beat);

    await page.scrollTo("document.getElementById('stack').offsetTop");
    await page.shot('03-home-stack');

    await page.scrollTo("document.getElementById('path').offsetTop");
    await page.shot('04-home-changelog');

    await page.scrollTo("document.getElementById('notes').offsetTop");
    await page.shot('05-home-notes-contact');

    // ---- 工作索引 + 拦截路由 ----
    await page.goto(`${BASE}/work`);
    await page.shot('06-work-index');
    await page.evaluate("document.querySelector('.card-project').click()");
    await sleep(900);
    const intercept = await page.evaluate(
      "({path: location.pathname, modal: !!document.querySelector('.modal-root'), dialogs: document.querySelectorAll('[role=dialog]').length})",
    );
    check('点卡片走拦截路由', intercept.path === '/work/storyboard' && intercept.modal, JSON.stringify(intercept));
    await page.shot('07-modal-open');

    await page.pressEscape();
    const afterEsc = await page.evaluate(
      "({path: location.pathname, modal: !!document.querySelector('.modal-root')})",
    );
    check('Esc 关闭弹层并回到列表', afterEsc.path === '/work' && !afterEsc.modal, JSON.stringify(afterEsc));

    // ---- 详情整页 ----
    await page.goto(`${BASE}/work/storyboard`);
    await page.shot('08-detail-page');

    // ---- 笔记 ----
    await page.goto(`${BASE}/notes`);
    await page.shot('09-notes-1440');
    await page.goto(`${BASE}/notes/api-key-not-in-browser`);
    await page.shot('10-note-detail');

    // ---- 关于 ----
    await page.goto(`${BASE}/about`);
    await page.shot('11-about');

    // ---- 深色 ----
    await page.goto(`${BASE}/?theme=dark`);
    const darkTheme = await page.evaluate("document.documentElement.dataset.theme");
    check('深色由 ?theme=dark 生效', darkTheme === 'dark', String(darkTheme));
    await page.shot('12-home-dark-top');
    await page.scrollTo("document.getElementById('path').offsetTop");
    await page.shot('13-home-dark-changelog');

    // ---- 降级动效 ----
    await page.goto(`${BASE}/?motion=reduce`);
    const motion = await page.evaluate("document.documentElement.dataset.motion || ''");
    check('?motion=reduce 生效', motion === 'reduce', motion);
    await page.shot('14-home-reduce');

    // ---- 768 ----
    await page.viewport(768, 1024);
    await page.goto(`${BASE}/`);
    await page.shot('15-home-768-top');
    await page.scrollTo("document.querySelectorAll('.scene')[0].offsetTop + window.innerHeight * 0.9");
    await page.shot('16-home-768-scene');

    // ---- 375 ----
    await page.viewport(390, 844);
    await page.goto(`${BASE}/`);
    await page.shot('17-home-390-top');
    const mobileScene = await page.evaluate(
      "(() => { const s = document.querySelectorAll('.scene')[0]; window.scrollTo(0, s.offsetTop + 60); return true; })()",
    );
    await sleep(800);
    await page.shot('18-home-390-scene');
    const stacked = await page.evaluate(
      "Array.from(document.querySelectorAll('.scene')[0].querySelectorAll('.beat')).filter(b => parseFloat(getComputedStyle(b).opacity) > 0.5).length",
    );
    check('移动端四拍同时展开', stacked === 4, `visible=${stacked}`);
    check('移动端导航折叠成汉堡', await page.evaluate(
      "getComputedStyle(document.querySelector('.nav__burger')).display !== 'none'",
    ));
    check('移动端右侧刻度导航隐藏', await page.evaluate(
      "getComputedStyle(document.querySelector('.rail')).display === 'none'",
    ));
    await page.goto(`${BASE}/work`);
    await page.shot('19-work-390');

    // ---- 资源与合规 ----
    const html = await (await fetch(`${BASE}/`)).text();
    check('没有外部字体', !html.includes('fonts.googleapis') && !html.includes('fonts.gstatic'));
    check('邮箱出现在页面上', html.includes('1542120178@qq.com'));
    check('手机号没有上站', !html.includes('19989916620'));
    check('有 skip-link', html.includes('跳到正文'));

    // 键盘可达：Tab 第一下应该落在 skip-link 上
    await page.viewport(1440, 900);
    await page.goto(`${BASE}/work`);
    await page.evaluate('document.body.focus()');
    await page.cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 }, page.sessionId);
    await page.cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 }, page.sessionId);
    await sleep(300);
    const firstFocus = await page.evaluate('document.activeElement.className || document.activeElement.tagName');
    check('第一次 Tab 到跳转链接', String(firstFocus).includes('skip-link'), String(firstFocus));

    ws.close();
  } finally {
    edge.kill();
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {
      /* Windows 上偶尔还被占用，忽略 */
    }
  }

  const failed = report.filter((r) => !r.ok);
  console.log(`\n${report.length - failed.length}/${report.length} 项通过，截图在 ${OUT}`);
  if (failed.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
