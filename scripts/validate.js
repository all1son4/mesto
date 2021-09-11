const showInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector('#')
  inputElement.classList.add(inputErrorClass);
};

const hideInputError = () => {

};

const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
  if (inputElement.validity.valid) {
    hideInputError();
    // нет ошибки
  }
  else {
    showInputError(formElement, inputElement, inputErrorClass);
    // есть ошибка
  }
};

const toggleButtonState = () => {

};

const setEventListeners = (formElement, inputErrorClass) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(formList.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass); //проверка валидности вводимых значений
      toggleButtonState(); //переключение состояния кнопки сабмит
    });
  });
  //обработчики событий для одной формы
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config.inputErrorClass);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});