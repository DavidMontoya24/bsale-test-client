import { headerBar } from "../components/header-bar.js";
import { ctgriesProvider, productsProvider } from "../scripts/context.js";
import DomBuilder from "../scripts/dombuilder.js";
import { renderCategory, paginationEvent } from "./render.js";

// Function that renders and display the Home Page
const renderHomePage = () => {
  const { products } = productsProvider;
  const { categories } = ctgriesProvider;

  return `
  <section class="container-xl">
    ${headerBar}
    <div>
      <p class="mb-4">Results: <strong>${
        products.length
      } products found</strong></p>
    </div>
    <section class="products-section">
      <div class="filter-section">
        <div class="flex justify-between items-center mb-4 ">
        <h3>Filters</h3>
        <button class="btn btn-secondary js-reset">Reset</button>
        </div>
        <ul class="categories_wrapper flex flex-column gap-4">
        ${categories.map((elm) => renderCategory(elm)).join("")}
        </ul>
      </div>
      <ul class="product_wrapper flex wrap"></ul>
    </section>
    <div class="pagination_wrapper flex">
      <button class="btn btn-primary js-btn-next"><i class='bx bxs-chevron-left'></i></button>
      <button class="btn btn-primary js-btn-back"><i class='bx bxs-chevron-right'></i></button>
    </div>
  </section>
  `;
};

const searchSubmitEvent = () => {
  const searchForm = document.querySelector(".js-search-form");
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value.toLowerCase();
    await productsProvider.fetchProductsByQuery(value);
    DomBuilder("#root").load(homePage);
  });
};

const resetEvent = () => {
  const reset = document.querySelector(".js-reset");
  reset.addEventListener("click", async (e) => {
    e.preventDefault();
    ctgriesProvider.currentCategory = null;
    productsProvider.querySearch = "";
    await productsProvider.fecthProducts();
    DomBuilder("#root").load(homePage);
  });
};

const filterByCtgryEvent = () => {
  const filters = document.querySelector(".categories_wrapper");

  for (let elem of filters.children) {
    elem.addEventListener("click", async (e) => {
      e.preventDefault();
      const ctgryId = e.target.dataset.id;

      productsProvider.status = "loading";
      DomBuilder("#root").load(homePage);

      ctgriesProvider.currentCategory = ctgryId;
      await productsProvider.fetchProductsByCtgry();
      DomBuilder("#root").load(homePage);
    });
  }
};

const ShowFilters = () => {
  const btn = document.querySelector(".filter-btn");
  const filterBox = document.querySelector(".filter-section");
  btn.addEventListener("click", () => {
    filterBox.classList.toggle("active");
  });
};

export const homePage = {
  toString() {
    return renderHomePage();
  },
  addListeners() {
    paginationEvent();
    filterByCtgryEvent();
    searchSubmitEvent();
    resetEvent();
    ShowFilters();
  },
};
