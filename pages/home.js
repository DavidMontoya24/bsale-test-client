import DomBuilder from "../scripts/dombuilder";

const renderHomePage = () => {
  return `
  <div>Hola</div>
  `;
};

export const homePage = {
  toString() {
    return renderHomePage();
  },
  addListeners() {},
};
