export default class UserInfo {
  constructor({userName, userDescription}) {
    this._userName = document.querySelector(userName);
    this._userDescription = document.querySelector(userDescription);
  }

  getUserInfo() {
    const dataUser = {};
    dataUser.name = this._userName.textContent;
    dataUser.description = this._userDescription.textContent;
    return dataUser;
  }

  setUserInfo({name, description}) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }
}