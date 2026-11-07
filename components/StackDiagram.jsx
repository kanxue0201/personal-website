import { stack } from '@/lib/content';
import Reveal from './Reveal';

/**
 * 技术栈不写成标签云，写成一块芯片的爆炸图：
 * 中心是方法（Vibe Coding），外面三层依次展开：语言、数据、工具与交付。
 * 悬停某一条时它自己浮起 4px —— 纯装饰，信息不依赖悬停才能读到。
 */
export default function StackDiagram() {
  return (
    <div className="stack">
      <Reveal>
        <div className="stack__core">
          <p className="stack__core-name">{stack.core.name}</p>
          <p className="stack__core-note">{stack.core.note}</p>
        </div>
      </Reveal>

      <div className="stack__layers">
        {stack.layers.map((layer, li) => (
          <Reveal key={layer.id} delay={0.06 * li} as="div">
            <div className="layer">
              <p className="layer__label">
                <b>{layer.label}</b>
                <span aria-hidden="true">L{li + 1}</span>
              </p>
              <ul className="chips">
                {layer.items.map((item) => (
                  <li className="chip" key={item.name}>
                    <span className="chip__name">{item.name}</span>
                    <span className="chip__note">{item.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
