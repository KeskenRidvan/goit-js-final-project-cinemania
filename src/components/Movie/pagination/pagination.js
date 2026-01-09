import "./pagination.css";

const isMobile = () => window.matchMedia("(max-width: 480px)").matches;
const pad2 = (n) => String(n).padStart(2, "0");

const withDots = (pages) => {
  const unique = [...new Set(pages)].sort((a, b) => a - b);
  const out = [];

  for (let i = 0; i < unique.length; i++) {
    const cur = unique[i];
    const prev = unique[i - 1];

    i > 0 && cur - prev > 1 && out.push("...");

    out.push(cur);
  }
  return out;
};

const buildPages = ({ current, total, compact }) => {
  if (compact) {
    const pages = [1, current - 1, current, current + 1].filter(
      (p) => p > 0 && p <= total
    );

    total - current < 3 && pages.push(total);
    return withDots(pages);
  }

  const pages = [];

  pages.push(1);

  const range = 2;
  for (let i = current - range; i <= current + range; i++) {
    i > 1 && i <= total && pages.push(i);
  }

  if (current < 5) {
    for (let i = 2; i <= Math.min(6, total); i++) pages.push(i);
  }

  total - current <= 5 && pages.push(total);

  return withDots(pages);
};

export const renderPagination = ({
  containerSelector,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const root = document.querySelector(containerSelector);
  if (!root) return;

  const total = Number(totalPages) || 1;
  const c = Number(currentPage) || 1;

  if (total <= 1) {
    root.innerHTML = "";
    return;
  }

  const items = buildPages({ current: c, total, compact: isMobile() });

  root.innerHTML = `
    <div class="pagination">
      <button class="pagination__btn" data-page="prev" aria-label="Previous Page" ${
        c <= 1 ? "disabled" : ""
      }>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <div class="pagination__pages">
        ${items
          .map((it) => {
            if (it === "...")
              return `<span class="pagination__dots">...</span>`;

            const isActive = it === c;
            const cls = isActive
              ? "pagination__page pagination__page--active"
              : "pagination__page";

            return `<button class="${cls}" data-page="${it}">${pad2(
              it
            )}</button>`;
          })
          .join("")}
      </div>

      <button class="pagination__btn" data-page="next" aria-label="Next Page" ${
        c >= total ? "disabled" : ""
      }>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  `;

  root.onclick = (e) => {
    const btn = e.target.closest("[data-page]");
    if (!btn) return;

    const val = btn.dataset.page;
    let nextPage = c;

    if (val === "prev") nextPage = c - 1;
    else if (val === "next") nextPage = c + 1;
    else nextPage = Number(val);

    onPageChange && onPageChange(nextPage);
  };
};
