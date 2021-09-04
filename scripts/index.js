let openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
let cardAddButton = document.querySelector('.profile__add-button');
let closePopupButton = document.querySelectorAll('.popup__close-button');
let formElement = document.querySelector('#form-profile');
const formCard = document.querySelector('#form-card');
let nameInput = document.querySelector('.popup__field_type_profile-name');
let descriptionInput = document.querySelector('.popup__field_type_profile-description');
const cardNameInput = document.querySelector('.popup__field_type_card-name');
const cardSrcInput = document.querySelector('.popup__field_type_card-src');
let popupSubmitButton = document.querySelector('.popup__submit-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');


const elementTemplate = document.querySelector('#element-template').content;
const elementSection = document.querySelector('.elements');
const imagePopupElement = popupImage.querySelector('.popup__image');
const captionPopupElement = popupImage.querySelector('.popup__caption');

function handleLikeClick() {
  event.target.classList.toggle('element__like-button_active');
};

function handleRemoveClick() {
  event.target.closest('.element').remove();
};

function handleBigSizeClick() {
  imagePopupElement.src = event.target.src;
  captionPopupElement.textContent = event.target.closest('.element').querySelector('.element__title').textContent;
  openPopup(popupImage)
};

const createCard = (data) => {
  const card = elementTemplate.querySelector('.element').cloneNode(true);
  const cardName = card.querySelector('.element__title');
  const cardSrc = card.querySelector('.element__image');
  cardSrc.src = data.link;
  cardName.textContent = data.name;

  const likeButton = card.querySelector('.element__like-button');
  const cardElementImage = card.querySelector('.element__image');
  const removeButton = card.querySelector('.element__remove-button');

  likeButton.addEventListener('click', (event) => {
    handleLikeClick();
  });

  removeButton.addEventListener('click', (event) => {
    handleRemoveClick();
  });

  cardElementImage.addEventListener('click', (event) => {
    handleBigSizeClick();
  });

  return card;
};

function renderCard(data) {
  elementSection.prepend(createCard(data));
};

initialCards.forEach((data) => {
  renderCard(data);
});

const openPopup = (popup) => {
  if (popup.classList.contains('popup_type_edit')) {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
  }

  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};


function formSubmitHandler(event) {
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
  openPopup(popupProfile);
});
cardAddButton.addEventListener('click', () => {
  openPopup(popupCard);
});

closePopupButton.forEach((item) => {
  item.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});

formElement.addEventListener('submit', formSubmitHandler);

formCard.addEventListener('submit', addCardSubmitHandler);