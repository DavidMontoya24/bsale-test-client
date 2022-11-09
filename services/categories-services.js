import fetchAPI from "./fetch.js";

/**
 * It returns a promise that resolves to the result of fetching the categories endpoint
 */
async function getCategories() {
  return await fetchAPI("categories");
}

export { getCategories };
