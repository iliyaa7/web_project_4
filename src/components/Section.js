export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(otherData) {
    otherData ? this._itemsArray = otherData : "";
    this._itemsArray.forEach((item) => {
      this._renderer(item);
    });
  }


  addItem(element, attachItemMethod) {
    attachItemMethod !== 'prepend' ?
      this._container.append(element) :
      this._container.prepend(element);
  }
}


