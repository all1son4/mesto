const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error_visible'
};

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
const popupSubmitButton = document.querySelector('.popup__submit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


const elementTemplate = document.querySelector('#element-template').content;
const elementSection = document.querySelector('.elements');
const popupContent = popupImage.querySelector('.popup__content');
const imagePopupElement = popupImage.querySelector('.popup__image');
const captionPopupElement = popupImage.querySelector('.popup__caption');

function handleLikeClick(event) {
  event.target.classList.toggle('element__like-button_active');
};

function handleRemoveClick(event) {
  event.target.closest('.element').remove();
};

function handleBigSizeClick(event) {
  imagePopupElement.src = event.target.src;
  captionPopupElement.textContent = event.target.alt;
  imagePopupElement.alt = event.target.alt;
  openPopup(popupImage)
};

const createCard = (data) => {
  const card = elementTemplate.querySelector('.element').cloneNode(true);
  const cardName = card.querySelector('.element__title');
  const cardSrc = card.querySelector('.element__image');
  cardSrc.src = data.link;
  cardName.textContent = data.name;
  cardSrc.alt = data.name;

  const likeButton = card.querySelector('.element__like-button');
  const cardElementImage = card.querySelector('.element__image');
  const removeButton = card.querySelector('.element__remove-button');

  likeButton.addEventListener('click', (event) => {
    handleLikeClick(event);
  });

  removeButton.addEventListener('click', (event) => {
    handleRemoveClick(event);
  });

  cardElementImage.addEventListener('click', (event) => {
    handleBigSizeClick(event);
  });

  return card;
};

function renderCard(data) {
  elementSection.prepend(createCard(data));
};

initialCards.forEach(renderCard);

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandlaer);
};

const openEditProfilePopup = (popupProfile) => {
  const formElement = popupProfile.querySelector(validationConfig.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const {submitButtonSelector, inactiveButtonClass} = validationConfig;
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);
  toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  formCard.reset();
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

enableValidation(validationConfig);