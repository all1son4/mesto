import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupFormElement = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupFormElement.reset();
    super.close();
  }

  setEventListeners() {
    this._popupFormElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close()
    });

    super.setEventListeners();
  }

  _getInputValues() {
    const formValues = {};
    const inputList = Array.from(this._popupFormElement.querySelectorAll('.popup__input'));
    inputList.forEach(inputElement => formValues[inputElement.name] = inputElement.value);
    return formValues;
  }

  loadingInfo(isLoading) {
    if (isLoading) {
      this._popupFormElement.querySelector('.popup__submit-button').textContent = 'Сохранение...';
    }
    else {
      this._popupFormElement.querySelector('.popup__submit-button').textContent = "Сохранить"
    }
  }

  loadindCard(isLoading) {
    if (isLoading) {
      this._popupFormElement.querySelector('.popup__submit-button').textContent = 'Создание...';
    }
    else {
      this._popupFormElement.querySelector('.popup__submit-button').textContent = "Создать"
    }
  }
}
