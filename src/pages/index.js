import './index.css';

import Card from '../components/Card';
// import { initialCards } from '../utils/cardList';
import { validationConfig } from '../utils/validationConfig';
import FormValidation from '../components/FormValidator';

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupForDelete from '../components/PopupForDelete';
// import UserAvatar from '../components/UserAvatar.js';

import Api from '../components/Api.js';

const opneEditAvatarButton = document.querySelector('.profile__image')
const openEditPopupButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('#form-profile');
const formCard = document.querySelector('#form-card');
const formAvatar = document.querySelector('#form-avatar');

const api = new Api(
  {
    adress: "https://nomoreparties.co/v1",
    groupID: "cohort-29",
    token: "624546b9-bde3-4fa2-b3a8-c5df4547d603"
  }
)

const userInfo = new UserInfo({
  userName: '.profile__name',
  userDescription: '.profile__description',
  userAvatar: '.profile__image',
});

const handleImageClick = (data) => {
  imagePopup.open(data);
};

// const handleDeleteClick = (card) => {
//   deleteCardPopup.open(card);
// }

let userID;
const createNewCard = (data) => {
  const card = new Card({
    data,
    handleImageClick,
    handleDeleteClick: () => {
      deleteCardPopup.open(card)
    },
    handleLikeClick: () => {
      const checkStatus = card.checkLikeStatus();

      if (checkStatus) {
        api
          .unlikeCard(card.getID())
          .then((data) => {
            card.setLikes(data.likes);
          })
          .catch(err => alert(`Ошибка обработки лайка: ${err}`))
      }

      else {
        api
          .likeCard(card.getID())
          .then((data) => {
            card.setLikes(data.likes);
          })
          .catch(err => alert(`Ошибка обработки лайка: ${err}`))
      }
    }
  },
  '#element-template',
  userID)

  const cardElement = card.generateCard();

  return cardElement;
};

const cardList = new Section ({
  renderer: (data) => {
    cardList.addItem(createNewCard(data));
  }
}, '.elements');
// cardList.renderItem();

api
  .getAppInfo()
  .then(([userInfoRes, cardListRes]) => {
    console.log(cardListRes);
    console.log(userInfoRes)

    userInfo.setUserInfo({
      name: userInfoRes.name,
      description: userInfoRes.about,
      avatar: userInfoRes.avatar,
    })
    userID = userInfoRes._id

    cardList.setItems(cardListRes)
    cardList.renderItem()
  })
  .catch(err => alert(`Ошибка полученя данных: ${err}`))

// const userInfoPopup = new PopupWithForm('.popup_type_edit', (data) => {
//   userInfo.setUserInfo(data);
// });

const userInfoPopup = new PopupWithForm('.popup_type_edit', (name, description) => {
    userInfo.setUserInfo(name, description);
    const data = userInfo.getUserInfo();

    userInfoPopup.loadingInfo(true);
    api
      .setUserInfoApi(data.name, data.description)
      .then(userInfoRes => {
        userInfo.setUserInfo({
          name: userInfoRes.name,
          description: userInfoRes.about
        })
      })
      .catch(err => alert(`Ошибка сохранения данных профиля: ${err}`))
      .finally(() => {
        userInfoPopup.loadingInfo(false);
      })
  });
userInfoPopup.setEventListeners();

const popupWithAvatar = new PopupWithForm('.popup_type_avatar', (avatar) => {
  userInfo.setUserInfo(avatar);

  api
    .setUserAvatarApi(avatar)
    .then(userInfoRes => {
      userInfo.setUserInfo(userInfoRes.avatar)
    })
    .catch(err => alert(`Ошибка сохранения данных профиля: ${err}`))
})
popupWithAvatar.setEventListeners();

const formProfileValidation = new FormValidation(validationConfig, formProfile);
formProfileValidation.enableValidation();

const openEditPopupProfileHandler = () => {
  const data = userInfo.getUserInfo();

  // for (let key in data) {
  //   formProfile.elements[key].value = data[key]
  // };

  formProfile.name.value = data.name;
  formProfile.description.value = data.description

  formProfileValidation.resetValidation();
  userInfoPopup.open();
};

openEditPopupButton.addEventListener('click', openEditPopupProfileHandler);

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const newCardPopup = new PopupWithForm('.popup_type_new-card', (data) => {
  // const data = {
  //   name: name_picture,
  //   link: picture_url
  // };

  // cardList.addItem(createNewCard(data));
  newCardPopup.loadindCard(true);
  api
    .addNewCard({name: data.name_picture, link: data.picture_url})
    .then((data) => {
      cardList.addItem(createNewCard({name: data.name_picture, link: data.picture_url}));
    })
    .catch(err => alert(`Ошибка отпраки данных: ${err}`))
    .finally(() => {
      newCardPopup.loadindCard(false)
    })
});
newCardPopup.setEventListeners();

const formCardValidation = new FormValidation(validationConfig, formCard);
formCardValidation.enableValidation();
formCardValidation.toggleButtonState();

cardAddButton.addEventListener('click', () => {
  formCardValidation.resetValidation();
  newCardPopup.open();
});

const deleteCardPopup = new PopupForDelete('.popup_type_delete', (event, card) => {

  api
    .deleteCard(card.getID())
    .then(() => {
      card._cardRemove();
    })
    .catch(err => alert(`Ошибка удаления: ${err}`))
});
deleteCardPopup.setEventListeners();

// const popupWithAvatar = new PopupWithForm('.popup_type_avatar', (avatar) => {
//   userAvatar.setUserAvatar(avatar);
//   const avatar = userAvatar.getUserInfo();
//   api
//     .setUserInfoApi(avatar)
//     .then(userInfoRes => {
//       userAvatar.setUserInfo({
//         avatar: userInfoRes.avatar,
//       })
//     })
//     .catch(err => alert(`Ошибка сохранения данных профиля: ${err}`))
// })
// popupWithAvatar.setEventListeners();

const popupFormAvatarValitadion = new FormValidation(validationConfig, formAvatar);
popupFormAvatarValitadion.enableValidation();

const openEditAvatarHandler = () => {
  popupFormAvatarValitadion.resetValidation();
  popupWithAvatar.open();
}

opneEditAvatarButton.addEventListener('click', openEditAvatarHandler);