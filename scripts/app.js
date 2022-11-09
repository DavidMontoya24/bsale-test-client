import { homePage } from "../pages/home.js";
import { ctgriesProvider, productsProvider } from "./context.js";
import DomBuilder from "./dombuilder.js";

/**
 * Setting our main prgram initialization
 * It fetches the products and categories from the API, then loads the home page
 */
const runApp = async () => {
  try {
    await productsProvider.fecthProducts();
    await ctgriesProvider.fetchCategories();
    DomBuilder("#root").load(homePage);
  } catch (error) {
    console.log(error);
  }
};

export default runApp;
