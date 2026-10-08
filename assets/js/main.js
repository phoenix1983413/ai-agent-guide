/* AI Agent 权威指南 —— 最小 JS */
(function () {
  "use strict";

  // 移动端侧边栏切换（未来可加汉堡按钮）
  const sidebar = document.querySelector(".sidebar");
  if (sidebar && window.innerWidth <= 820) {
    const toggle = document.createElement("button");
    toggle.textContent = "☰ 目录";
    toggle.setAttribute("aria-label", "切换目录");
    Object.assign(toggle.style, {
      position: "fixed",
      top: "12px",
      left: "12px",
      zIndex: 20,
      background: "rgba(15,23,42,0.9)",
      color: "#22d3ee",
      border: "1px solid #1e293b",
      borderRadius: "6px",
      padding: "6px 12px",
      fontSize: "13px",
      cursor: "pointer",
    });
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("is-open");
    });
    document.body.appendChild(toggle);
  }

  // 代码块语言标签（可选增强）
  document.querySelectorAll("pre code").forEach((block) => {
    const cls = Array.from(block.classList).find((c) => c.startsWith("language-"));
    if (!cls) return;
    const lang = cls.replace("language-", "").toUpperCase();
    const pre = block.parentElement;
    pre.setAttribute("data-lang", lang);
  });
})();
