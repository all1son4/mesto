export default class UserAvatar {
  constructor(userAvatar) {
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserAvatar() {
    const avatar = this._userAvatar.src;
    return avatar;
  }

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}
