export default class UserAvatar {
  constructor(userAvatar) {
    this._userAvatar = document.querySelector(userAvatar).style.backgroundImage
  }

  getUserAvatar() {
    return this._userAvatar.slice(5, -2);
  }

  setUserAvatar(avatar) {
    this._userAvatar = `url('${avatar}')`;
  }
}
