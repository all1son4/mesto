const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
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
  imagePopupElement.alt = event.target.closest('.element').querySelector('.element__title').textContent;
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
  popup.classList.add('popup_opened');
};

const openEditProfilePopup = (popupProfile) => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openPopup(popupProfile);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
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