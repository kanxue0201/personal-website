import React from 'react';

/**
 * 极简 Markdown：只支持写笔记时真正会用到的那几样（##、列表、引用、粗体、行内代码）。
 * 手写解析而不是引依赖 —— 站点体积比功能重要。
 */

function inline(text) {
  const out = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let match;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('**')) {
      out.push(
        <strong key={`b${key++}`} style={{ color: 'var(--ink)', fontWeight: 500 }}>
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      out.push(<code key={`c${key++}`}>{token.slice(1, -1)}</code>);
    }
    last = match.index + token.length;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function parseMarkdown(md) {
  const blocks = [];
  const lines = md.split(/\r?\n/);
  let list = null;
  let para = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: 'p', text: para.join(' ') });
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push({ type: 'ul', items: list });
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      flushPara();
      flushList();
      continue;
    }

    if (line.startsWith('## ')) {
      flushPara();
      flushList();
      blocks.push({ type: 'h2', text: line.slice(3) });
      continue;
    }

    if (line.startsWith('- ')) {
      flushPara();
      if (!list) list = [];
      list.push(line.slice(2));
      continue;
    }

    if (line.startsWith('> ')) {
      flushPara();
      flushList();
      blocks.push({ type: 'quote', text: line.slice(2) });
      continue;
    }

    flushList();
    para.push(line);
  }

  flushPara();
  flushList();
  return blocks;
}

export function Markdown({ source }) {
  const blocks = parseMarkdown(source);

  return (
    <div className="prose">
      {blocks.map((block, i) => {
        if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>;
        if (block.type === 'ul') {
          return (
            <ul key={i} style={{ display: 'grid', gap: 6 }}>
              {block.items.map((item, j) => (
                <li key={j}>{inline(item)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === 'quote') return <blockquote key={i}>{inline(block.text)}</blockquote>;
        return <p key={i}>{inline(block.text)}</p>;
      })}
    </div>
  );
}
