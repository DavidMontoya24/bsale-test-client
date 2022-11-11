import DomBuilder from "../scripts/dombuilder.js";
import Loader from "../components/loader.js";
import { headerBar } from "../components/header-bar.js";
import { ctgriesProvider, productsProvider } from "../scripts/context.js";
import {
  renderCategory,
  renderProduct,
  displayProducts,
  showPagination,
  isInCart,
} from "./render.js";
import { addToCart, showCartPage } from "../components/cart.js";

// Function that renders and display the Home Page
const renderHomePage = () => {
  const { products, status, currPage } = productsProvider;
  const { categories } = ctgriesProvider;

  return `
  ${headerBar}
  <section class="container-xl">
    <div class="options-container">
      <p>Results: <strong>${products.length} products found</strong></p>

      <div>
        <label for="sortby-price">Sort by Price:
          <select name="sortby" id="sortby-price">
            <option disabled selected>Select an option</option>
            <option value="desc">Highest</option>
            <option value="asc">Lowest</option>
          </select>
        </label>
      </div>

      <div>
        <label for="sortby-name">Sort by Name:
          <select name="sortby" id="sortby-name">
            <option disabled selected="selected">Select an option</option>
            <option value="desc">A-Z</option>
            <option value="asc">Z-A</option>
          </select>
        </label>
      </div>

      <div><button class="btn btn-secondary show-cart">Go to Cart<i class='bx bxs-cart bx-sm'></i></button></div>

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
      <ul class="product_wrapper flex wrap">
        ${
          products.length !== 0
            ? displayProducts(products, 9, currPage)
                .map((elm) => renderProduct(elm, status, isInCart(elm)))
                .join("")
            : `<div class="flex items-center justify-center"><h3 style="color: var(--gray-200); font-size: 3rem">No results found. Try again</h3></div>`
        }
      </ul>
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
    //Adding loader on the header
    const headerWrapper = document.querySelector(".header-wrapper");
    const loadingBar = document.createElement("div");
    loadingBar.innerHTML = `${Loader()}`;
    headerWrapper.prepend(loadingBar);

    //Submitting the search
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
      productsProvider.currPage = 1;
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
      const ctgryId = e.target.dataset.id;
      productsProvider.status = "loading";
      DomBuilder("#root").load(homePage);

      ctgriesProvider.currentCategory = ctgryId;
      productsProvider.currPage = 1;
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
  //Sort By Price
  const selectPrice = document.getElementById("sortby-price");
  selectPrice.addEventListener("change", async () => {
    const value = selectPrice.value;
    if (value === "desc") {
      productsProvider.products.sort((a, b) => b.price - a.price);
      DomBuilder("#root").load(homePage);
      const selectPrice = document.getElementById("sortby-price");
      selectPrice.options[1].setAttribute("selected", "selected");
    }
    if (value === "asc") {
      productsProvider.products.sort((a, b) => a.price - b.price);
      DomBuilder("#root").load(homePage);
      const selectPrice = document.getElementById("sortby-price");
      selectPrice.options[2].setAttribute("selected", "selected");
    }
  });

  // Sorty by Name
  const selectName = document.getElementById("sortby-name");
  selectName.addEventListener("change", () => {
    const index = selectName.selectedIndex;
    if (index === -1) return;
    const value = selectName.options[index].value;
    if (value === "desc") {
      productsProvider.products.sort((a, b) => a.name.localeCompare(b.name));
      DomBuilder("#root").load(homePage);
      const selectName = document.getElementById("sortby-name");
      selectName.options[1].setAttribute("selected", "selected");
    }
    if (value === "asc") {
      productsProvider.products.sort((a, b) => b.name.localeCompare(a.name));
      DomBuilder("#root").load(homePage);
      const selectName = document.getElementById("sortby-name");
      selectName.options[2].setAttribute("selected", "selected");
    }
  });
};

export const homePage = {
  toString() {
    return renderHomePage();
  },
  addListeners() {
    filterByCtgryEvent();
    searchSubmitEvent();
    resetEvent();
    ShowFilters();
    SortBy();
    addToCart();
    showCartPage();
    showPagination();
  },
};
