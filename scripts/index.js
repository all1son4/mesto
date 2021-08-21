window.onload = function() {
  page = document.querySelector('.page');
  page.classList.remove('page__load');
}

let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('#form');
let nameInput = document.querySelectorAll('.popup__field')[0];
let descriptionInput = document.querySelectorAll('.popup__field')[1];
let popupSubmitButton = document.querySelector('.popup__submit-button');

function switchPopup() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = document.querySelector('.profile__name').textContent;
    descriptionInput.value = document.querySelector('.profile__description').textContent;
  }

  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();

  let name = document.querySelector('.profile__name');
  let description = document.querySelector('.profile__description')

  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;

  popup.classList.toggle('popup_opened');
}

openPopupButton.addEventListener('click', switchPopup);
closePopupButton.addEventListener('click', switchPopup);

formElement.addEventListener('submit', formSubmitHandler);