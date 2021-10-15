export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._userNameCurrentData = document.querySelector(userNameSelector);
    this._userAboutCurrentData = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    const userData = {
      fullname: this._userNameCurrentData.textContent,
      about: this._userAboutCurrentData.textContent
    };
    return userData;
  }

  setUserInfo(newUserData) {
    this._userNameCurrentData.textContent = newUserData.fullName;
    this._userAboutCurrentData.textContent = newUserData.about;
  }
}
