export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userNameCurrentData = document.querySelector(userNameSelector);
    this._userAboutCurrentData = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._userNameCurrentData.textContent,
      about: this._userAboutCurrentData.textContent,

    };
    return userData;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userNameCurrentData.textContent = name;
    this._userAboutCurrentData.textContent = about;
    this.id = _id;
    this._userAvatar.src = avatar;
  }

  updateUserAvatar({ avatar }) {
    this._userAvatar.src = avatar;
  }
}
