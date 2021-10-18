import Card from './components/Card.js';
import { initialCards } from './cardList.js';
import { validationConfig } from './validationConfig.js';
import FormValidation from './components/FormValidator.js';

import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';

const openEditPopupButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('#form-profile');
const formCard = document.querySelector('#form-card');


const userInfo = new UserInfo({
  userName: '.profile__name',
  userDescription: '.profile__description'
});

const userInfoPopup = new PopupWithForm('.popup_type_edit', (data) => {
  userInfo.setUserInfo(data);
});
userInfoPopup.setEventListeners();

const formProfileValidation = new FormValidation(validationConfig, formProfile);
formProfileValidation.enableValidation();

const openEditPopupProfileHandler =() => {
  const data = userInfo.getUserInfo();

  for (let key in data) {
    formProfile.elements[key].value = data[key]
  };

  formProfileValidation.resetValidation();
  userInfoPopup.open();
};

openEditPopupButton.addEventListener('click', openEditPopupProfileHandler);

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const handleImageClick = (data) => {
  imagePopup.open(data);
};

const createNewCard = (data) => {
  const card = new Card(
  data,
  '#element-template',
  handleImageClick);
  const cardElement = card.generateCard();

  return cardElement;
};

const cardList = new Section ({
  items: initialCards,
  renderer: (data) => {
    cardList.addItem(createNewCard(data));
  }
}, '.elements');
cardList.renderItem();

const newCardPopup = new PopupWithForm('.popup_type_new-card', ({name_picture, picture_url}) => {
  const data = {
    name: name_picture,
    link: picture_url
  };
  debugger;
  cardList.addItem(createNewCard(data));
});
newCardPopup.setEventListeners();

const formCardValidation = new FormValidation(validationConfig, formCard);
formCardValidation.enableValidation();
formCardValidation.toggleButtonState();

cardAddButton.addEventListener('click', () => {
  formCardValidation.resetValidation();
  newCardPopup.open();
});
