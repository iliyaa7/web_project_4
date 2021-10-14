export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userAboutSelector = document.querySelector(userAboutSelector);
    this._popup = document.querySelector("#edit-profile__popup");
  }

  getUserInfo() {
    this._formValues = {};
    this._formValues.fullname = this._userNameSelector.textContent;
    this._formValues.about = this._userAboutSelector.textContent;
    return this._formValues;
  }

  setUserInfo() {
    this._inputList = this._popup.querySelectorAll(".popup__form-input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    this._userNameSelector.textContent = this._formValues.fullName;
    this._userAboutSelector.textContent = this._formValues.about;
  }
}
