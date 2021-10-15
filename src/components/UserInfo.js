export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userAboutSelector = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    this._formValues = {};
    this._formValues.fullname = this._userNameSelector.textContent;
    this._formValues.about = this._userAboutSelector.textContent;
    return this._formValues;
  }

  setUserInfo(newUserData) {
    this._inputList = newUserData;
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    this._userNameSelector.textContent = this._formValues.fullName;
    this._userAboutSelector.textContent = this._formValues.about;
  }
}
