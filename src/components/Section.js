export default class Section { //создание класса разметки
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItems(items) {
    this._renderedItems = items
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
