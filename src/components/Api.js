export default class Api {
  constructor({ adress, groupID, token }) {
    this._adress = adress;
    this._groupID = groupID;
    this._token = token;
  }

  getAppInfo() {
    return Promise.all([this.getUserInfoApi(), this.getCardList()])
  }

  getUserInfoApi() {
    const query = "users/me";

    return this._get(query);
  }

  setUserInfoApi(name, description) {
    const query = "users/me";

    return this._set(query, "PATCH", {name, about: description});
  }

  setUserAvatarApi(avatar) {
    const query = "users/me/avatar";

    return this._set(query, "PATCH", avatar);
  }

  getCardList() {
    const query = "cards";

     return this._get(query);
  }

  _get(query) {
    const options = {
      headers: {
        authorization: this._token
      }
    }

    return fetch(this._url(query), options)
      .then(res => res.ok ? res.json() : Promise.reject(`Упс, получилась ошибка: ${res.status}`))
  }

  _set(query, method, body) {
    const options = {
      method,
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }

    return fetch(this._url(query), options)
      .then(res => res.ok ? res.json() : Promise.reject(`Упс, получилась ошибка: ${res.status}`))
  }

  _url(query) {
    return `${this._adress}/${this._groupID}/${query}`
  }
}