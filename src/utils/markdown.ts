import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

// 创建 markdown-it 实例
const md = new MarkdownIt({
    html: true, // 启用 HTML 标签
    linkify: true, // 自动识别链接
    typographer: true, // 启用排版优化
    breaks: true, // 转换段落里的 '\n' 到 <br>
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                const highlighted = hljs.highlight(str, {
                    language: lang,
                }).value;
                return highlighted;
            } catch (__) {}
        }
        return ""; // 使用额外的默认转义
    },
});

// 生成唯一ID
let codeBlockId = 0;

// 自定义渲染规则
md.renderer.rules.table_open = () =>
    '<div class="table-wrapper"><table class="markdown-table">';
md.renderer.rules.table_close = () => "</table></div>";

md.renderer.rules.code_block = (tokens, idx) => {
    const token = tokens[idx];
    const lang = token.info || "text";
    const id = `code-block-${++codeBlockId}`;

    let highlighted = token.content;
    if (lang && hljs.getLanguage(lang)) {
        try {
            highlighted = hljs.highlight(token.content, {
                language: lang,
            }).value;
        } catch (__) {
            highlighted = token.content;
        }
    }

    return `
    <div class="code-block">
      <div class="code-header">
        <span class="code-lang">${lang}</span>
        <button class="copy-btn" onclick="copyToClipboard('${id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          复制
        </button>
      </div>
      <pre><code id="${id}" class="hljs language-${lang}">${highlighted}</code></pre>
    </div>
  `;
};

md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const lang = token.info || "text";
    const id = `code-block-${++codeBlockId}`;

    let highlighted = token.content;
    if (lang && hljs.getLanguage(lang)) {
        try {
            highlighted = hljs.highlight(token.content, {
                language: lang,
            }).value;
        } catch (__) {
            highlighted = token.content;
        }
    }

    return `
    <div class="code-block">
      <div class="code-header">
        <span class="code-lang">${lang}</span>
        <button class="copy-btn" onclick="copyToClipboard('${id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          复制
        </button>
      </div>
      <pre><code id="${id}" class="hljs language-${lang}">${highlighted}</code></pre>
    </div>
  `;
};

export const renderMarkdown = (content: string): string => {
    return md.render(content);
};
