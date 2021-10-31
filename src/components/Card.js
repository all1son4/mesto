export default class Card { //создание класса Карточки
  constructor({data, handleImageClick, handleDeleteClick, handleLikeClick}, cardSelector, userID) {
    this._image = data.link;
    this._title = data.name;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._userID = userID
    this._likes = data.likes
    this._cardID = data._id
    this._ownerID = data.owner._id
    this._handleDeleteClick = handleDeleteClick
    this._handleLikeClick = handleLikeClick
  }

  getID() {
    return this._cardID
  }

  _getTemplate() { //приватный метод шаблона карточки
    const cardTemplate = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardTemplate;
  }

  _cardLike = (event) =>  { //приватный метод для лайка на карточке
    event.target.classList.toggle('element__like-button_active');
  }

  _likesUpdate() {
    this._element.querySelector('.element__like-counter').textContent = this._likes.length
  }

  setLikes(likes) {
    this._likes = likes;
    this._likesUpdate();
    this._likeStatusUpdate();
  }

  checkLikeStatus() {
    return this._likes.find((user) => {
      return user._id === this._userID;
    })
  }

  _likeStatusUpdate() {
    const checkStatus = this.checkLikeStatus();

    this._element.querySelector('.element__like-button').classList.remove('element__like-button_active');
    if (checkStatus) {
      this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
    }
  }

  _cardRemove = () => { //приватный метода удаления карточки
    this._element.remove();
  }

  _setEventListeners = () => { //приватный метод установки слушателей событий для карточки
    this._element
    .querySelector('.element__like-button')
    .addEventListener('click', (event) => {  //событие лайка на карточке
      this._handleLikeClick();
    });

    this._element
    .querySelector('.element__remove-button')
    .addEventListener('click', (event) => {  //событие удаления карточки
      // this._cardRemove(event);
      this._handleDeleteClick(event)
    });

    this._element
    .querySelector('.element__image')
    .addEventListener('click', () => {  //событие открытия попапа карточки
      this._handleImageClick({link: this._image, name: this._title});
    });
  }

  generateCard = () => { // публчиный метод создания карточки на старнице
    this._element = this._getTemplate();
    this._setEventListeners();

    if (this._ownerID !== this._userID) {
      this._element.querySelector('.element__remove-button').remove();
    }

    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    this.setLikes(this._likes);

    return this._element;
  }
}
