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
