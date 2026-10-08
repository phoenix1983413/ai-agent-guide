/* ============================================================
   AI Agent 权威指南 —— 交互脚本
   1. 右侧「本页小节导航」自动生成（从正文 h2/h3 提取）
   2. Scrollspy：滚动时高亮当前小节
   3. 移动端侧边栏切换 + 代码语言标签
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- 1. 生成本页 toc ---------------- */
  function slugify(text, seen) {
    let s = text
      .trim()
      .toLowerCase()
      .replace(/[（(].*?[)）]/g, "")
      .replace(/[\s　]+/g, "-")
      .replace(/[，。：:；;、,\.\/\\|·—\-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (!s) s = "sec";
    // 中文无法 slug 化时用序号兜底，保证 id 唯一
    let base = s, n = 1;
    while (seen.has(s)) { n++; s = base + "-" + n; }
    seen.add(s);
    return s;
  }

  function buildToc() {
    const body = document.querySelector(".chapter__body");
    if (!body) return null;

    const seen = new Set();
    const heads = body.querySelectorAll("h2, h3");
    if (!heads.length) return null;

    const toc = document.createElement("aside");
    toc.className = "page-toc";
    toc.setAttribute("aria-label", "本页目录");

    const title = document.createElement("div");
    title.className = "page-toc__title";
    title.textContent = "本页目录";
    toc.appendChild(title);

    const list = document.createElement("ul");
    list.className = "page-toc__list";

    const links = [];
    heads.forEach((h) => {
      const id = slugify(h.textContent, seen);
      h.id = id;
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + id;
      a.className = "toc-link" + (h.tagName === "H3" ? " toc-link--sub" : "");
      a.textContent = h.textContent.replace(/^\d+(\.\d+)*\s*/, "");
      if (h.tagName === "H3") a.style.paddingLeft = "22px";
      li.appendChild(a);
      list.appendChild(li);
      links.push({ id: id, el: a, head: h });
    });
    toc.appendChild(list);
    document.body.appendChild(toc);
    return links;
  }

  const tocLinks = buildToc();

  /* ---------------- 2. Scrollspy ---------------- */
  if (tocLinks && tocLinks.length) {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        let current = tocLinks[0];
        const y = window.scrollY + 96; // 顶部偏移阈值
        for (const item of tocLinks) {
          if (item.head.getBoundingClientRect().top + window.scrollY <= y) {
            current = item;
          }
        }
        // 触底时高亮最后一项
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 8) {
          current = tocLinks[tocLinks.length - 1];
        }
        tocLinks.forEach((item) => item.el.classList.toggle("toc-link--active", item === current));
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- 3. 移动端侧边栏 ---------------- */
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    const mq = window.matchMedia("(max-width: 820px)");
    let toggle = null;

    function setupToggle() {
      if (mq.matches && !toggle) {
        toggle = document.createElement("button");
        toggle.textContent = "☰ 目录";
        toggle.setAttribute("aria-label", "切换目录");
        Object.assign(toggle.style, {
          position: "fixed",
          top: "12px",
          left: "12px",
          zIndex: 20,
          background: "rgba(15,23,42,0.92)",
          color: "#22d3ee",
          border: "1px solid #1e293b",
          borderRadius: "6px",
          padding: "6px 12px",
          fontSize: "13px",
          cursor: "pointer",
        });
        toggle.addEventListener("click", () => sidebar.classList.toggle("is-open"));
        document.body.appendChild(toggle);
      } else if (!mq.matches && toggle) {
        toggle.remove();
        toggle = null;
        sidebar.classList.remove("is-open");
      }
    }
    mq.addEventListener("change", setupToggle);
    setupToggle();
  }

  /* ---------------- 4. 代码块语言标签 ---------------- */
  document.querySelectorAll("pre > code[class*='language-']").forEach((block) => {
    const cls = Array.from(block.classList).find((c) => c.startsWith("language-"));
    if (!cls) return;
    const lang = cls.replace("language-", "");
    block.parentElement.setAttribute("data-lang", lang.toUpperCase());
  });
})();
