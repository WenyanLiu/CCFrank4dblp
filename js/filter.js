/**
 * MIT License
 *
 * Copyright (c) 2019-2024 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const filter = {
  currentFilter: "ALL",
  processedEntries: new Set(),

  init() {
    if (!window.location.hostname.startsWith("dblp")) {
      return;
    }

    this.createFilterButtons();
    this.bindEvents();
    this.setupInfiniteScrollHandler();
  },

  createFilterButtons() {
    const filterDiv = document.createElement("div");
    filterDiv.className = "ccf-filter";
    filterDiv.innerHTML = `
      <button data-rank="ALL" class="active">ALL</button>
      <button data-rank="A">CCF A</button>
      <button data-rank="B">CCF B</button>
      <button data-rank="C">CCF C</button>
    `;
    document.body.appendChild(filterDiv);
  },

  setupInfiniteScrollHandler() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.applyFilter(true);
        }
      });
    });

    const trigger = document.querySelector("#completesearch-publs");
    if (trigger) {
      observer.observe(trigger);
    }

    window.addEventListener(
      "scroll",
      this.debounce(() => {
        this.applyFilter(true);
      }, 200),
    );
  },

  applyFilter(preserveExisting = false) {
    const entries = document.querySelectorAll(
      "#completesearch-publs > div > ul > li",
    );
    entries.forEach((entry) => {
      const entryId = entry.querySelector("a")?.href || entry.innerHTML;
      if (this.processedEntries.has(entryId) && preserveExisting) {
        return;
      }

      this.processedEntries.add(entryId);

      const hasCCFC = entry.textContent.includes("CCF C");
      const hasCCFB = entry.textContent.includes("CCF B");
      const hasCCFA = entry.textContent.includes("CCF A");

      let shouldShow = false;

      if (this.currentFilter === "ALL") {
        shouldShow = true;
      } else if (this.currentFilter === "C" && hasCCFC) {
        shouldShow = true;
      } else if (this.currentFilter === "B" && hasCCFB) {
        shouldShow = true;
      } else if (this.currentFilter === "A" && hasCCFA) {
        shouldShow = true;
      }

      const currentlyVisible = entry.style.display !== "none";
      if (currentlyVisible !== shouldShow || !preserveExisting) {
        entry.style.display = shouldShow ? "" : "none";
      }
    });
  },

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  bindEvents() {
    document.querySelector(".ccf-filter").addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        document.querySelectorAll(".ccf-filter button").forEach((btn) => {
          btn.classList.remove("active");
        });
        e.target.classList.add("active");

        this.currentFilter = e.target.dataset.rank;
        this.applyFilter(false);
      }
    });
  },
};
