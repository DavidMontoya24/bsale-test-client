import { homePage } from "../pages/home.js";
import { productsProvider } from "../scripts/context.js";
import DomBuilder from "../scripts/dombuilder.js";

productsProvider.inCart = JSON.parse(localStorage.getItem("incart")) || [];

/**
 * It adds the selected product to the cart array and removes it if it's already in the cart array
 */
const addToCart = () => {
  const icons = document.querySelectorAll(".cart-icon");
  const { cartPage, currPage } = productsProvider;
  productsProvider.products;
  // Assign click event on every cart icon
  for (let elem of icons) {
    elem.addEventListener("click", () => {
      const id = +elem.parentElement.parentElement.id;
      const selectedProduct = productsProvider.products.find(
        (elem) => +elem.id === +id
      );
      // Searching if the selected product is already in the list
      const matchedProduct = productsProvider.inCart.find(
        (elem) => +elem.id === +selectedProduct.id
      );
      // The selected product is not in the cart array and we are adding it to the list
      if (!matchedProduct) {
        elem.classList.add("active");
        console.log("Adding to cart...");
        productsProvider.inCart.push(selectedProduct);
        localStorage.setItem("incart", JSON.stringify(productsProvider.inCart));
        productsProvider.currPage = currPage;
        DomBuilder("#root").load(homePage);
      }
      // The selected is in the cart array and we are in the home page
      else if (matchedProduct && !cartPage) {
        console.log("removing of cart...");
        productsProvider.inCart = productsProvider.inCart.filter((i) => {
          return +i.id !== +matchedProduct.id;
        });
        localStorage.setItem("incart", JSON.stringify(productsProvider.inCart));
        productsProvider.currPage = currPage;
        DomBuilder("#root").load(homePage);
      }
      // The selected is in the cart array and we are in the cart page
      else if (matchedProduct && cartPage) {
        console.log("in cart page removing of cart...");
        productsProvider.inCart = productsProvider.inCart.filter((i) => {
          return +i.id !== +matchedProduct.id;
        });
        localStorage.setItem("incart", JSON.stringify(productsProvider.inCart));
        productsProvider.products = productsProvider.inCart;
        productsProvider.currPage = currPage;
        DomBuilder("#root").load(homePage);
      }
    });
  }
};

/**
 * It checks if we are in the cart page or not, and if we are, it adds a click event to the button that
 * returns us to the home page, and if we are not, it adds a click event to the button that takes us to
 * the cart page
 */
const showCartPage = () => {
  const iconBtn = document.querySelector(".show-cart");
  const productsInCart = JSON.parse(localStorage.getItem("incart"));
  const { cartPage } = productsProvider;

  // Check if we are in the cart page already
  if (cartPage) {
    const filterSection = document.querySelector(".filter-section");
    filterSection.style.display = "none";

    const newBtn = document.querySelector(".show-cart");
    newBtn.classList.add("active");
    newBtn.innerHTML = "<i class='bx bx-left-arrow-alt bx-sm'></i>Return";

    productsProvider.currPage = 1;
    // Adding the click event to button
    iconBtn.addEventListener("click", async () => {
      productsProvider.cartPage = false;

      productsProvider.status = "loading";
      DomBuilder("#root").load(homePage);

      await productsProvider.fecthProducts();
      DomBuilder("#root").load(homePage);
    });
  }
  // If not we area in the home page
  else {
    console.log("bdfauklt");
    const newBtn = document.querySelector(".show-cart");
    newBtn.innerHTML = "Go to Cart<i class='bx bxs-cart bx-sm'></i>";
    newBtn.classList.remove("active");

    productsProvider.currPage = 1;

    // Adding the click event to button
    iconBtn.addEventListener("click", () => {
      if (!productsInCart) return;
      productsProvider.products = productsInCart;
      productsProvider.cartPage = true;
      DomBuilder("#root").load(homePage);
    });
  }
};

export { addToCart, showCartPage };
