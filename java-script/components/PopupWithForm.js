import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormHendler) {
    super(popupSelector);
    this._submitFormHendler = submitFormHendler;
  }

  close() {
    super.close();
    this._popup.querySelector(".popup__form").reset();
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__form-input");
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault()
      this._submitFormHendler(this._getInputValues());
      this.close();
    });
  }
}

