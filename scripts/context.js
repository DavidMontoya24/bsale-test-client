import { getCategories } from "../services/categories-services.js";
import {
  getProducts,
  getProductsByCtgry,
  getProductsByQuery,
} from "../services/products-services.js";

/** "Fetch the categories from the API and store them in the categories property. **/
async function fetchCategories() {
  const categories = await getCategories();
  this.categories = categories;
}

const ctgriesProvider = {
  categories: [],
  currentCategory: null,
  fetchCategories,
};

/** FecthProducts is an async function that fetches products and sets the status to success. **/
async function fecthProducts() {
  const products = await getProducts();
  this.products = products;
  this.status = "success";
}

/** It fetches products by category and sets the status to success **/
async function fetchProductsByCtgry() {
  const products = await getProductsByCtgry(ctgriesProvider.currentCategory);
  this.products = products;
  this.status = "success";
}

/**It fetches products by query and sets the products and status properties of the current object
 * @param query - The query string to search for products.
 **/
async function fetchProductsByQuery(query) {
  const products = await getProductsByQuery(query);
  this.products = products;
  this.status = "success";
}

const productsProvider = {
  products: [],
  inCart: [],
  currPage: 1,
  status: "pending",
  querySearch: "",
  fecthProducts,
  fetchProductsByCtgry,
  fetchProductsByQuery,
};

export { ctgriesProvider, productsProvider };
