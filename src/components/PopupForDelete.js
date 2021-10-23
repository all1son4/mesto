import Popup from "./Popup.js";

export default class PopupForDelete extends Popup {
  constructor(popupSelector, handleDeleteSubmit) {
    super(popupSelector);
    this._submitDeleteButton = document.querySelector('.popup__submit-button_type_delete');
    this._handleDeleteSubmit = handleDeleteSubmit;
  }

  setEventListeners() {
    this._submitDeleteButton.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleDeleteSubmit(event);
      this.close();
    });

    super.setEventListeners();
  }
}