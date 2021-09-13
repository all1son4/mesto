const showInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
    // нет ошибки
  }
  else {
    showInputError(inputElement, errorElement, inputErrorClass, errorClass);
    // есть ошибка
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const hasVoidInput = (inputList) => {
  return inputList.every(inputElement => {
    return inputElement.value.lenght === 0;
  });
};

const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
};

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
};

const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputList) || hasVoidInput(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
    //выключить кнопку
  }
  else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
    //включить кнопку
  }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass); //проверка валидности вводимых значений
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass); //переключение состояния кнопки сабмит
    });
  });
  //обработчики событий для одной формы

  toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config.inputSelector, config.submitButtonSelector, config.inputErrorClass, config.errorClass, config.inactiveButtonClass);
  });
};