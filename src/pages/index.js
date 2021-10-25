import './index.css';

import Card from '../components/Card';
import { initialCards } from '../utils/cardList';
import { validationConfig } from '../utils/validationConfig';
import FormValidation from '../components/FormValidator';

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupForDelete from '../components/PopupForDelete';
import UserAvatar from '../components/UserAvatar.js';

import Api from '../components/Api.js';

const opneEditAvatarButton = document.querySelector('.profile__image')
const openEditPopupButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('#form-profile');
const formCard = document.querySelector('#form-card');
const formAvatar = document.querySelector('#form-avatar');

const apiUserInfo = new Api(
  {
    url: "https://nomoreparties.co/v1/cohort-29/users/me",
    headers: {
      authorization: "624546b9-bde3-4fa2-b3a8-c5df4547d603",
      "content-type": "application/json",
    }
  }
)

const userInfo = new UserInfo({
  userName: '.profile__name',
  userDescription: '.profile__description'
});

const userAvatar = new UserAvatar('.profile__image');

const userInfoPopup = new PopupWithForm('.popup_type_edit', (data) => {
  userInfo.setUserInfo(data);
});
userInfoPopup.setEventListeners();

const formProfileValidation = new FormValidation(validationConfig, formProfile);
formProfileValidation.enableValidation();

const openEditPopupProfileHandler = () => {
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

const apiCardList = new Api(
  {
    url: "https://mesto.nomoreparties.co/v1/cohort-29/cards",
    headers: {
      authorization: "624546b9-bde3-4fa2-b3a8-c5df4547d603",
      "content-type": "application/json",
    }
  }
)

apiCardList.getCardList();

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

const deleteCardPopup = new PopupForDelete('.popup_type_delete', (event) => {
  cardList._cardRemove(event);
});
deleteCardPopup.setEventListeners();

const popupWithAvatar = new PopupWithForm('.popup_type_avatar', (data) => {
  userAvatar.setUserAvatar(data);
})
popupWithAvatar.setEventListeners();

const popupFormAvatarValitadion = new FormValidation(validationConfig, formAvatar);
popupFormAvatarValitadion.enableValidation();

const openEditAvatarHandler = () => {
  const data = userAvatar.getUserAvatar();

  // for (let key in data) {
  //   formAvatar.elements[key].value = data[key]
  // };

  popupFormAvatarValitadion.resetValidation();
  popupWithAvatar.open();
}

opneEditAvatarButton.addEventListener('click', openEditAvatarHandler);