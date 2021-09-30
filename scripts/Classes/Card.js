export default class Card { //создание класса Карточки
  constructor(data, handleImageClick) {
    this._image = data.link;
    this._title = data.name;
    this._handImageClick = handleImageClick
  }

  _getTemplate(cardSelector) { //приватный метод шаблона карточки
    const cardTemplate = cardSelector
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardTemplate;
  }

  _cardLike = (event) =>  { //приватный метод для лайка на карточке
    event.target.classList.toggle('element__like-button_active');
  }

  _cardRemove = (event) => { //приватный метода удаления карточки
    event.target.closest('.element').remove();
  }

  _setEventListeners = () => { //приватный метод установки слушателей событий для карточки
    this._element
    .querySelector('.element__like-button')
    .addEventListener('click', (event) => {  //событие лайка на карточке
      this._cardLike(event);
    });

    this._element
    .querySelector('.element__remove-button')
    .addEventListener('click', (event) => {  //событие удаления карточки
      this._cardRemove(event);
    });

    this._element
    .querySelector('.element__image')
    .addEventListener('click', () => {  //событие открытия попапа карточки
      this._handImageClick(this._image, this._title);
    });
  }

  _generateCard = (cardSelector) => { // публчиный метод создания карточки на старнице
    this._element = this._getTemplate(cardSelector);
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;

    return this._element;
  }

  static createCard = (data, cardSelector, handleImageClick) => {
    const card = new Card(data, handleImageClick);
    const cardElement = card._generateCard(cardSelector);

    return cardElement;
  };
}