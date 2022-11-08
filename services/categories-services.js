import fetchAPI from "./fetch.js";

async function getCategories() {
  return await fetchAPI("categories");
}

export { getCategories };
