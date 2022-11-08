function renderHeaderBar() {
  return `
  <header class="header">
    <h1>Bsale Test</h1>
    <h5>by David Montoya</h5>
  </header>
  <div class="search-bar">
    <form class="header_bar js-search-form">
      <div class="input_wrapper">
        <i class='bx bx-search bx-sm' style='color:#b5b5b5'></i>
        <input id="search" type="form" class="input-search js-input-search" placeholder="Click button search or hit enter to search a product"/>
      </div>
      <button type="submit"  class="btn btn-primary js-search-button">Search</button>
    </form>
    <div class="header-options">
      <button class="btn btn-primary reset-btn">Reset</button>
      <button class="btn btn-primary filter-btn"><i class='bx bx-filter bx-sm'></i></button>
    </div>
  </div>
  `;
}

export const headerBar = {
  toString() {
    return renderHeaderBar();
  },
  addListeners() {},
};
