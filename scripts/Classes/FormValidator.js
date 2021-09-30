export default class FormValidation { //создание класса валидации
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(
    this._validationConfig.inputSelector));
  }

  _showInputError = (inputElement) => { //приватный метод отображения ошибки на вводе
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._validationConfig.errorClass);
  };

  _hideInputError = (inputElement) => { // приватный метод удаления отображения ошибки на вводе
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    this._errorElement.classList.remove(this._validationConfig.errorClass);
    this._errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => { //приватный метод проверки ошибки на вводе
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);  // нет ошибки
    }
    else {
      this._showInputError(inputElement); // есть ошибка
    }
  };

  _hasInvalidInput = () => { // приватный метод проверки валидности вводимых значений
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

  _hasVoidInput = () => {
    return this._inputList.every(inputElement => { // приватны метод проверки на пустое поле
      return inputElement.value.lenght === 0;
    });
  };

  _disableSubmitButton = () => { // приватный метод отключения кнопки сабмита
    this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableSubmitButton = () => { // приватный метод включения кнопки сабмита
    this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  toggleButtonState = () => { //публичный метод переключения состояния кнопки сабмита
    if (this._hasInvalidInput() || this._hasVoidInput()) {
      this._disableSubmitButton(); //выключить кнопку
    }
    else {
      this._enableSubmitButton(); //включить кнопку
    }
  };

  _setEventListeners = () => { // приватный метод добавления обработчиков событий
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => { //обработчики событий для одной формы
        this._checkInputValidity(inputElement); //проверка валидности вводимых значений
        this.toggleButtonState(); //переключение состояния кнопки сабмит
      });
    });
  };

  enableValidation = () => { // публичный метод добавления валидации форме
    this._setEventListeners();
  };

  static resetValidation = () => {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };
}
