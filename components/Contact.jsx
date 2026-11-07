'use client';

import { useState } from 'react';
import { profile } from '@/lib/content';
import Reveal from './Reveal';

/**
 * 联系区就一件事：让人拿到邮箱。
 * 点一下复制，并给一个两秒的「已复制」反馈；手机号不上站。
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // 剪贴板被拒绝时退回选中文本
      const input = document.createElement('input');
      input.value = profile.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="band" aria-labelledby="contact-title">
      <div className="shell">
        <Reveal>
          <h2 className="contact__line t-epic" id="contact-title">
            Let&apos;s build something.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="contact__row">
            <button
              type="button"
              className="copy-mail"
              data-copied={copied}
              onClick={copy}
              aria-label={`复制邮箱 ${profile.email}`}
            >
              {profile.email}
              <span className="copy-mail__flag">{copied ? '已复制' : '点击复制'}</span>
            </button>

            <span className="sr-only" aria-live="polite">
              {copied ? '邮箱已复制到剪贴板' : ''}
            </span>

            {profile.links
              .filter((link) => link.href && !link.href.startsWith('mailto:'))
              .map((link) => (
                <a
                  key={link.label}
                  className="link-underline t-small"
                  href={link.href}
                  {...(link.href.startsWith('http')
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                >
                  {link.label}
                </a>
              ))}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="t-small" style={{ marginTop: 24 }}>
            {profile.location} · 通常一个工作日之内回信
          </p>
        </Reveal>
      </div>
    </section>
  );
}
