let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('#form');
let nameInput = document.querySelectorAll('.popup__field')[0];
let descriptionInput = document.querySelectorAll('.popup__field')[1];
let popupSubmitButton = document.querySelector('.popup__submit-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function switchPopup() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
  }

  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();

  let name = profileName;
  let description = profileDescription;

  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;

  switchPopup();
}

openPopupButton.addEventListener('click', switchPopup);
closePopupButton.addEventListener('click', switchPopup);

formElement.addEventListener('submit', formSubmitHandler);