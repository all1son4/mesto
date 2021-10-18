import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    debugger;
    this._popupFormElement = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupFormElement.reset();
    super.close();
  }

  setEventListeners() {
    debugger;
    this._popupFormElement.addEventListener('submit', (event) => {
      event.preventDefault();
      debugger;
      this._handleFormSubmit(this._getInputValues());
      this.close()
    });

    super.setEventListeners();
  }

  _getInputValues() {
    const formValues = {};
    const inputList = Array.from(this._popupFormElement.querySelectorAll('.popup__input'));
    inputList.forEach(inputElement => formValues[inputElement.name] = inputElement.value);
    console.log(formValues);
    return formValues;
  }
}