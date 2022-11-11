import { priceTransformer } from "../scripts/utils.js";
import { ctgriesProvider, productsProvider } from "../scripts/context.js";
import DomBuilder from "../scripts/dombuilder.js";
import { homePage } from "./home.js";

// Function that renders a card product
const renderProduct = (product, status, inCart) => {
  return `
  <li class="product_card flex flex-column" id=${product.id}>
    <div class="product_image" >
      ${status === "loading" ? `<div class="skeleton-image"></div>` : ""}
      ${
        status === "success"
          ? `
          <i class='bx bxs-cart bx-md cart-icon ${inCart ? "active" : ""}'></i>
        ${
          product.url_image
            ? `<img src=${product.url_image} alt="image_card"/>`
            : `<i class='bx bxs-image-alt bx-lg' style='color:#b5b5b5'></i><div><p>Image coming soon</p></div>`
        }
        ${
          product.discount === 0
            ? ""
            : `
          <div class="blob_price">
            <h3>${product.discount}</h3>
            <div class="blob_price_content">
              <h4>%</h4>
              <p>OFF</p>
            </div>
          </div>
          `
        }
      `
          : ""
      }
    </div>
    <div class="product_desc">
      ${status === "loading" ? `<div class="skeleton-desc"></div>` : ""}
      ${
        status === "success"
          ? `
        <div class="product_price">${priceTransformer(product.price)}</div>
        <div class="product_name">${product.name.toUpperCase()}</div>
        `
          : ""
      }
    </div>
  </li>
    `;
};

// Function that renders a category button
const renderCategory = (category) => {
  const currentCtgry = ctgriesProvider.currentCategory;
  return `
  <button class="btn btn-category ${
    +category.id === +currentCtgry ? "activeCtgry" : ""
  }" data-id=${category.id}> ${category.name.toUpperCase()} </button>
  `;
};

// Function that displays product in DOM
const displayProducts = (list, rows, page) => {
  page--;
  let start = rows * page,
    end = start + rows;
  let paginatedItems = list.slice(start, end);
  return paginatedItems;
};

/**
 * It takes the products array from the productsProvider and divides it by the number of rows in the
 * table. Then it creates a button for each page and adds an event listener to each button.
 * When the button is clicked, the current page is set to the value of the button and the home page is
 * reloaded
 */
const showPagination = () => {
  const pagWrap = document.querySelector(".pagination_wrapper");
  const products = productsProvider.products;
  const rows = 9;

  // Quantity of buttons
  const quant =
    (Math.trunc(products.length / rows) - products.length / rows) * -1 >= 0.5
      ? Math.round(products.length / rows)
      : Math.round(products.length / rows) + 1;
  let arrBtns = [];
  for (let i = 1; i <= quant; i++) {
    arrBtns.push(i);
  }
  // Rendering the buttons of showPagination
  pagWrap.innerHTML = arrBtns
    .map((elm) => `<button class="btn btn-primary">${elm}</button>`)
    .join("");

  for (let i = 0; i < pagWrap.children.length; i++) {
    pagWrap.children[i].setAttribute("value", +pagWrap.children[i].innerHTML);
    pagWrap.children[i].addEventListener("click", (e) => {
      const value = e.target.getAttribute("value");
      productsProvider.currPage = value;
      DomBuilder("#root").load(homePage);
    });
  }
};

// Check if the product is already in cart
const isInCart = (elm) => {
  const incart = JSON.parse(localStorage.getItem("incart"));
  let onCart;
  if (incart) onCart = incart.find((e) => e.id === elm.id);
  onCart = onCart ? true : false;
  return onCart;
};

export {
  renderProduct,
  renderCategory,
  displayProducts,
  showPagination,
  isInCart,
};
