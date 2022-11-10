import fetchAPI from "./fetch.js";

/**
 * It returns the result of calling the fetchAPI function with the string "products" as the argument
 * @returns A promise that resolves to the data returned from the API.
 */
async function getProducts() {
  return await fetchAPI("products");
}

/**
 * It returns a promise that resolves to the result of fetching the products of a category
 * @param ctgryId - The category ID of the category you want to get products from.
 * @returns A promise that resolves to an array of products.
 */
async function getProductsByCtgry(ctgryId) {
  return await fetchAPI("categories/" + ctgryId + "/products");
}

/**
 * It returns a promise that resolves to the result of fetching the API endpoint "products/{query}"
 * @param query - The query string to search for products.
 * @returns A promise
 */
async function getProductsByQuery(query) {
  return await fetchAPI("products/search/name=" + query);
}

export { getProducts, getProductsByCtgry, getProductsByQuery };
