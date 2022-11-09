/**
 * It takes a parent selector and returns an object with a load method that takes a module and a reload
 * method that reloads the module
 * @param parent - The parent element that the module will be loaded into.
 * @returns An object with two methods, load and reload.
 */

export default function DomBuilder(parent) {
  const targetParent = document.querySelector(parent);

  if (!targetParent) throw new Error("Parent not found");

  return {
    module: null,
    load(module) {
      this.module = module;
      targetParent.innerHTML = module;
      module.addListeners();
    },
    reload() {
      this.load(this.module);
    },
  };
}
