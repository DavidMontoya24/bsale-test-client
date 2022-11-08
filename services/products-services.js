import fetchAPI from "./fetch.js";

async function getProducts() {
  return await fetchAPI("products");
}

async function getProductsByCtgry(ctgryId) {
  return await fetchAPI("categories/" + ctgryId + "/products");
}

async function getProductsByQuery(query) {
  return await fetchAPI("products/" + query);
}

export { getProducts, getProductsByCtgry, getProductsByQuery };
