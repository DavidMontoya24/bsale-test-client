import headerBar from "../components/header-bar.js";
import { ctgriesProvider, productsProvider } from "../scripts/context.js";
import DomBuilder from "../scripts/dombuilder.js";
import { renderCategory, paginationEvent } from "./render.js";

const renderHomePage = () => {
  const { products } = productsProvider;
  const { categories } = ctgriesProvider;

  return `
  <section class="container-xl">
    ${headerBar()}
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

export const homePage = {
  toString() {
    return renderHomePage();
  },
  addListeners() {
    paginationEvent();
  },
};
