import Popup from "./Popup.js";
export default class PopupSubmit extends Popup {
  constructor(popupSelector, submitFormHandler) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._submitDeleteHandler = this._submitDeleteHandler.bind(this);
  }

  open( cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
    this._popup.addEventListener("submit", this._submitDeleteHandler);
  }

  close() {
    super.close();
    this._popup.removeEventListener("submit", this._submitDeleteHandler);
  }

  _submitDeleteHandler(evt)  {
    evt.preventDefault();
    this._submitFormHandler(this._cardId, this._cardElement)
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
