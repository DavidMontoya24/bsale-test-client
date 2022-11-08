import { priceTransformer } from "../scripts/utils.js";

const renderProduct = (product) => {
  return `
  <li class="product_card flex flex-column">
  <div class="product_image">
  ${
    product.url_image
      ? `<img src=${product.url_image} alt="image_card"/>`
      : `<i class='bx bxs-image-alt bx-lg' style='color:#b5b5b5'></i><div><p>Image not found</p></div>`
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
  </div>
  <div class="product_desc">
    <div class="product_price">${priceTransformer(product.price)}</div>
    <div class="product_name">${product.name.toUpperCase()}</div>
  </div>
  </li>
  `;
};

const renderCategory = (category) => {
  return `
  <button class="btn btn-primary" data-id=${
    category.id
  }> ${category.name.toUpperCase()} </button>
  `;
};

export { renderProduct, renderCategory };
