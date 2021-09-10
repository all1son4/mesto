const checkInputValidity = () => {
  if (inputElement.validity.valid) {
    // нет ошибки
  }
  else {
    // есть ошибка
  }
};

const toggleButtonState = () => {

};

const setEventListeners = (formElement) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(formList.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(); //проверка валидности вводимых значений
      toggleButtonState(); //переключение состояния кнопки сабмит
    });
  });
  //обработчики событий для одной формы
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};