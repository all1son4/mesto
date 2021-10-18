import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(data) {
    this._popupElement.querySelector('.popup__caption').textContent = data.name;
    this._popupElement.querySelector('.popup__image').src = data.link;
    this._popupElement.querySelector('.popup__image').alt = data.name;

    super.open();
  }
}
