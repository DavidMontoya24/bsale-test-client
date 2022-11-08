import { homePage } from "../pages/home.js";
// import { Data } from "../services/products-services.js";
import { ctgriesProvider, productsProvider } from "./context.js";
import DomBuilder from "./dombuilder.js";

const runApp = async () => {
  try {
    // await Data.fetchCategories();
    // await Data.fetchProducts();
    await ctgriesProvider.fetchCategories();
    await productsProvider.fecthProducts();
    DomBuilder("#root").load(homePage);
  } catch (error) {
    console.log(error);
  }
};

export default runApp;
