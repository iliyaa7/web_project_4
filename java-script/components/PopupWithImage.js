import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    this._popup.querySelector(".popup__image").src = link;
    this._popup.querySelector(".popup__image").alt = "A picture of " + name;
    this._popup.querySelector(".popup__caption").textContent = name;
  }
}
