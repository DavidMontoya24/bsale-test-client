import { LogoBsale } from "../styles/assets/icons.js";

/**
 * It renders the header bar of the app
 * returns a string with the HTML code for the header bar.
 */
function renderHeaderBar() {
  return `
  <header class="header-wrapper">
    <div class="container-xl">
      <div class="header">
        <div class="js-reset">
          ${LogoBsale}
        </div>
        <div>
          <h1>bsale test</h1>
          <h5>by David Montoya</h5>
        </div>
      </div>
      <div class="search-bar">
        <form class="header_bar js-search-form">
          <div class="input_wrapper">
            <i class='bx bx-search bx-sm' style='color:#b5b5b5'></i>
            <input id="search" type="form" class="input-search js-input-search" placeholder="Click button search or hit enter to search a product"/>
          </div>
          <button type="submit"  class="btn btn-primary-darker js-search-button">Search</button>
        </form>
        <div class="header-options">
          <button class="btn btn-primary-darker reset-btn js-reset">Reset</button>
          <button class="btn btn-primary-darker filter-btn"><i class='bx bx-filter bx-sm'></i></button>
        </div>
      </div>
    </div>
  </header>
  `;
}

export const headerBar = {
  toString() {
    return renderHeaderBar();
  },
  addListeners() {},
};
