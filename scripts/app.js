import { homePage } from "../pages/home.js";
import { Data } from "../services/products-services.js";
import DomBuilder from "./dombuilder.js";

const runApp = async () => {
  try {
    // await Data.fetchCategories();
    // await Data.fetchProducts();
    DomBuilder("#root").load(homePage);
  } catch (error) {
    console.log(error);
  }
};

export default runApp;
