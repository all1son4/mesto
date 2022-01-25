import Popup from "./Popup.js";

export default class PopupForDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._submitDeleteButton = document.querySelector('.popup__submit-button_type_delete');
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._submitDeleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleFormSubmit(event, this._card);
    });

    super.setEventListeners();
  }

  open(card) {
    this._card = card;
    super.open()
  }
}