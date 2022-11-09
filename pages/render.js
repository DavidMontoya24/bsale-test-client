import { priceTransformer } from "../scripts/utils.js";
import { productsProvider } from "../scripts/context.js";
import Loader from "../components/loader.js";

// Function that renders a card product
const renderProduct = (product, status) => {
  return `
  <li class="product_card flex flex-column">
    <div class="product_image">
      ${status === "loading" ? Loader() : ""}
      ${
        status === "success"
          ? `
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
    ${
      status === "success"
        ? `
      <div class="product_desc">
        <div class="product_price">${priceTransformer(product.price)}</div>
        <div class="product_name">${product.name.toUpperCase()}</div>
      </div>
    `
        : ""
    }
  </li>
    `;
};

// Function that renders a category button
const renderCategory = (category) => {
  return `
  <button class="btn btn-primary" data-id=${
    category.id
  }> ${category.name.toUpperCase()} </button>
  `;
};

// Function that displays product in DOM
const displayProducts = (list, wrapper, rows, page) => {
  page--;
  let start = rows * page,
    end = start + rows;
  let paginatedItems = list.slice(start, end);
  if (paginatedItems.length === 0) {
    wrapper.innerHTML = `<div class="flex items-center justify-center"><h3 style="color: var(--gray-200); font-size: 3rem">No results found. Try again</h3></div>`;
  } else {
    const { status } = productsProvider;
    wrapper.innerHTML = paginatedItems
      .map((elm) => renderProduct(elm, status))
      .join("");
  }
};

// Function that handle the pagination
const paginationEvent = () => {
  let rows = 9,
    page = 1;
  const productWrapper = document.querySelector(".product_wrapper");
  const products = productsProvider.products;
  const quant =
    (Math.trunc(products.length / rows) - products.length / rows) * -1 >= 0.5
      ? Math.round(products.length / rows)
      : Math.round(products.length / rows) + 1;

  const pagWrap = document.querySelector(".pagination_wrapper");
  let arrBtns = [];
  for (let i = 1; i <= quant; i++) {
    arrBtns.push(i);
  }
  pagWrap.innerHTML = arrBtns
    .map((elm) => `<button class="btn btn-primary">${elm}</button>`)
    .join("");

  for (let i = 0; i < pagWrap.children.length; i++) {
    pagWrap.children[i].setAttribute("value", +pagWrap.children[i].innerHTML);
    pagWrap.children[i].addEventListener("click", (e) => {
      const value = e.target.getAttribute("value");
      displayProducts(products, productWrapper, rows, value);
    });
  }
  displayProducts(products, productWrapper, rows, page);
};

export { renderProduct, renderCategory, paginationEvent };
