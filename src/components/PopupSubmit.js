import Popup from "./Popup.js";
export default class PopupSubmit extends Popup {
  constructor(popupSelector, cardId, cadrElement, submitFormHandler) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._cardId = cardId;
    this._cadrElement = cadrElement;
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault()
      this._submitFormHandler(this._cardId, this._cadrElement)
      this.close();
    });
  }
}
