export default class Section { //создание класса разметки
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItem() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}