import { homePage } from "../pages/home.js";
import { isInCart, renderProduct } from "../pages/render.js";
import { productsProvider } from "../scripts/context.js";
import DomBuilder from "../scripts/dombuilder.js";

productsProvider.inCart = JSON.parse(localStorage.getItem("incart")) || [];

/**
 * It adds an event listener to each of the icons in the products page, and when clicked, it checks if
 * the product is already in the cart, if not, it adds it to the cart, and if it is, it removes it from
 * the cart
 */
const addToCart = () => {
  const icons = document.querySelectorAll(".cart-icon");
  productsProvider.products;
  for (let elem of icons) {
    elem.addEventListener("click", () => {
      const id = +elem.parentElement.parentElement.id;
      const selectedProduct = productsProvider.products.find(
        (elem) => +elem.id === +id
      );
      let inCart = productsProvider.inCart;
      const matchedProduct = inCart.find(
        (elem) => +elem.id === +selectedProduct.id
      );
      if (!matchedProduct) {
        elem.classList.add("active");
        console.log("Adding to cart...");
        productsProvider.inCart.push(selectedProduct);
        localStorage.setItem("incart", JSON.stringify(productsProvider.inCart));
        DomBuilder("#root").load(homePage);
      } else {
        elem.classList.remove("active");
        console.log("removing of cart...");
        productsProvider.inCart = productsProvider.inCart.filter((i) => {
          return +i.id !== +matchedProduct.id;
        });
        localStorage.setItem("incart", JSON.stringify(productsProvider.inCart));
        DomBuilder("#root").load(homePage);
      }
    });
  }
};

/**
 * It adds an event listener to the button that shows the cart, and when the button is clicked, it
 * checks if the button has the class "active" and if it doesn't, it adds the class "active" to the
 * button, changes the button's innerHTML to "Return", and renders the products in the cart. If the
 * button has the class "active", it changes the button's innerHTML to "Go to cart", removes the class
 * "active" from the button, and renders the home page
 */
const showCart = () => {
  const btn = document.querySelector(".show-cart");
  const section = document.querySelector(".product_wrapper");
  const productsInCart = JSON.parse(localStorage.getItem("incart"));
  const { status } = productsProvider;

  btn.addEventListener("click", () => {
    const isactive = btn.classList.contains("active");
    if (!isactive) {
      btn.classList.add("active");
      btn.innerHTML = "Return";
      section.innerHTML = productsInCart.map((elm) =>
        renderProduct(elm, status, isInCart(elm))
      );
    }
    if (isactive) {
      btn.innerHTML = "Go to cart";
      btn.classList.remove("active");
      DomBuilder("#root").load(homePage);
    }
  });
};

export { addToCart, showCart };
