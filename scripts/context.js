import { getCategories } from "../services/categories-services.js";
import {
  getProducts,
  getProductsByCtgry,
  getProductsByQuery,
} from "../services/products-services.js";

// Context for the categories
async function fetchCategories() {
  const categories = await getCategories();
  this.categories = categories;
}

const ctgriesProvider = {
  categories: [],
  currentCategory: null,
  fetchCategories,
};

// Context for the products
async function fecthProducts() {
  const products = await getProducts();
  this.products = products;
  // this.status = "success";
}

async function fetchProductsByCtgry() {
  const products = await getProductsByCtgry(ctgriesProvider.currentCategory);
  this.products = products;
  // this.status = "success";
}

async function fetchProductsByQuery(query) {
  const products = await getProductsByQuery(query);
  this.products = products;
  // this.status = "success";
}

const productsProvider = {
  products: [],
  // status: "idle",
  query: "",
  fecthProducts,
  fetchProductsByCtgry,
  fetchProductsByQuery,
};

export { ctgriesProvider, productsProvider };
