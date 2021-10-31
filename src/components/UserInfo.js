export default class UserInfo {
  constructor({userName, userDescription, userAvatar}) {
    this._userName = document.querySelector(userName);
    this._userDescription = document.querySelector(userDescription);
    this._userAvatar = document.querySelector(userAvatar)
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
      avatar: this._userAvatar.style.backgroundImage.slice(5, -2)
    }
  }

  setUserInfo({name, description, avatar, userID}) {
    if (name) this._userName.textContent = name;
    if (description) this._userDescription.textContent = description;
    if (avatar) this._userAvatar.style.backgroundImage = `url('${avatar}')`;
    if (userID) this._userID = userID;
  }
}
