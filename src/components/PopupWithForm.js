import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormHandler) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
  }

  close() {
    super.close();
    this._popup.querySelector(".popup__form").reset();
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__form-input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", () => {
      this._submitFormHandler(this._getInputValues());
      this.close();
    });
  }
}
