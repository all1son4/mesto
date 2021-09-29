import Card from './Card.js';
import { initialCards } from './cardList.js';
import { validationConfig } from './validationConfig.js';
import FormValidation from './FormValidator.js';



const openPopupButton = document.querySelector('.profile__edit-button');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupContainers = Array.from(document.querySelectorAll('.popup__container'));
const popupProfile = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const cardAddButton = document.querySelector('.profile__add-button');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const formProfile = document.querySelector('#form-profile');
const formCard = document.querySelector('#form-card');
const nameInput = document.querySelector('.popup__field_type_profile-name');
const descriptionInput = document.querySelector('.popup__field_type_profile-description');
const cardNameInput = document.querySelector('.popup__field_type_card-name');
const cardSrcInput = document.querySelector('.popup__field_type_card-src');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elementSection = document.querySelector('.elements');
const popupContent = popupImage.querySelector('.popup__content');
const imagePopupElement = popupImage.querySelector('.popup__image');
const captionPopupElement = popupImage.querySelector('.popup__caption');



function handleImageClick(image, title) {
  imagePopupElement.src = image;
  captionPopupElement.textContent = title;
  imagePopupElement.alt = title;

  openPopup(popupImage)
};

function renderCard(data) {
  const card = new Card(data, handleImageClick);
  const cardElement = card.generateCard();

  elementSection.prepend(cardElement);
};
initialCards.forEach(renderCard);

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandlaer);
};

const openEditProfilePopup = (popupProfile) => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandlaer);
};

const keyHandlaer = (event) => {
  if (event.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

function editFormProfileSubmitHandler(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(popupProfile);
};

function addCardSubmitHandler(event) {
  event.preventDefault();
    renderCard({
      name: cardNameInput.value,
      link: cardSrcInput.value
    });
  formCard.reset();
  closePopup(popupCard);
};

openPopupButton.addEventListener('click', () => {
  openEditProfilePopup(popupProfile);
});

cardAddButton.addEventListener('click', () => {
  openPopup(popupCard);
});

closePopupButtons.forEach((item) => {
  item.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});

formProfile.addEventListener('submit', editFormProfileSubmitHandler);
formCard.addEventListener('submit', addCardSubmitHandler);

popupContainers.forEach((popup) =>{
  popup.addEventListener('click', (event) => {
    event.stopPropagation();
  });
});

popupContent.addEventListener('click', (event) => {
  event.stopPropagation();
});

popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    closePopup(popup);
  });
});



const formProfileValidation = new FormValidation(validationConfig, formProfile);
formProfileValidation.enableValidation();

const formCardValidation = new FormValidation(validationConfig, formCard);
formCardValidation.enableValidation();
formCardValidation.toggleButtonState();