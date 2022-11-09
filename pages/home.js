import { headerBar } from "../components/header-bar.js";
import { ctgriesProvider, productsProvider } from "../scripts/context.js";
import DomBuilder from "../scripts/dombuilder.js";
import { renderCategory, paginationEvent } from "./render.js";

// Function that renders and display the Home Page
const renderHomePage = () => {
  const { products } = productsProvider;
  const { categories } = ctgriesProvider;

  return `
  ${headerBar}
  <section class="container-xl">
    <div class="options flex">
      <p class="mb-4">Results: <strong>${
        products.length
      } products found</strong></p>

      <div>
        <label for="sortby-name">Sort by:</label>
        <select name="sortby" id="sortby-name">
          <option disabled selected="selected">Select an option</option>
          <option value="desc">A-Z</option>
          <option value="asc">Z-A</option>
        </select>
      </div>
      
      <div>
        <label for="sortby-price">Sort by:</label>
        <select name="sortby" id="sortby-price">
          <option disabled selected="selected">Select an option</option>
          <option value="desc">Highest</option>
          <option value="asc">Lowest</option>
        </select>
      </div>

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

/**
 * When the search form is submitted, prevent the default action, get the value of the search input,
 * fetch the products that match the search query, and load the home page
 */
const searchSubmitEvent = () => {
  const searchForm = document.querySelector(".js-search-form");
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value.toLowerCase();
    await productsProvider.fetchProductsByQuery(value);
    DomBuilder("#root").load(homePage);
  });
};

/**
 * It adds an event listener to all elements with the class "js-reset" and when clicked, it resets the
 * current category and the query search to null and then fetches the products and loads the home page
 */
const resetEvent = () => {
  const reset = document.querySelectorAll(".js-reset");
  for (let elem of reset) {
    elem.addEventListener("click", async (e) => {
      e.preventDefault();
      ctgriesProvider.currentCategory = null;
      productsProvider.querySearch = "";
      await productsProvider.fecthProducts();
      DomBuilder("#root").load(homePage);
    });
  }
};

/**
 * It adds an event listener to each category filter, and when clicked, it fetches the products of that
 * category and renders them on the page
 */
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

/**
 * a function that toggles the class of the filter-section element to active when the
 * filter-btn element is clicked
 */
const ShowFilters = () => {
  const btn = document.querySelector(".filter-btn");
  const filterBox = document.querySelector(".filter-section");
  btn.addEventListener("click", () => {
    filterBox.classList.toggle("active");
  });
};

/**
 * It listens for a change in the select element, then it sorts the products array based on the selected value
 */
const SortBy = () => {
  // Sorty by Name
  const selectName = document.getElementById("sortby-name");
  selectName.addEventListener("change", () => {
    // console.dir(selectName);
    const index = selectName.selectedIndex;
    if (index === -1) return;
    const value = selectName.options[index].value;
    if (value === "desc") {
      productsProvider.products.sort((a, b) => a.name.localeCompare(b.name));
      DomBuilder("#root").load(homePage);
    }
    if (value === "asc") {
      productsProvider.products.sort((a, b) => b.name.localeCompare(a.name));
      DomBuilder("#root").load(homePage);
    }
  });

  //Sort By Price
  const selectPrice = document.getElementById("sortby-price");
  selectPrice.addEventListener("change", () => {
    const index = selectPrice.selectedIndex;
    if (index === -1) return;
    const value = selectPrice.options[index].value;
    if (value === "asc") {
      productsProvider.products.sort((a, b) => a.price - b.price);
      DomBuilder("#root").load(homePage);
    }
    if (value === "desc") {
      productsProvider.products.sort((a, b) => b.price - a.price);
      DomBuilder("#root").load(homePage);
    }
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
    SortBy();
  },
};
