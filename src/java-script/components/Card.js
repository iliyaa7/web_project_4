export default class Card {
  constructor(cardData, templateSelector, { handleCardClick }) {
    this._cardTitle = cardData.name;
    this._cardUrl = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".post")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".post__heading").textContent = this._cardTitle;
    this._element.querySelector(".post__image").alt =
      "A photo of " + this._cardTitle;
    this._element.querySelector(".post__image").src = this._cardUrl;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".post__delete-button")
      .addEventListener("click", () => {
        this._handleDeletePost();
      });
    this._element
      .querySelector(".post__button")
      .addEventListener("click", () => {
        this._handleToggleCardLike();
      });
    this._element
      .querySelector(".post__image-button")
      .addEventListener("click", () => {
        this._handleCardClick(this._cardTitle, this._cardUrl);
      });
  }

  _handleToggleCardLike() {
    this._element
      .querySelector(".post__button")
      .classList.toggle("post__button_active");
  }

  _handleDeletePost() {
    this._element.remove();
  }
}
