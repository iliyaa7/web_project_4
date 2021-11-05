export default class Card {
  constructor({name, link, likes, _id}, templateSelector, { handleCardClick }, { handleLikeClick }, { handleDeleteClick }) {
    this._cardTitle = name;
    this._cardUrl = link;
    this._like = likes;
    this._likes = likes.length;
    this._cardId = _id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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
    this._element.querySelector(".post__like-counter").textContent = this._likes  > 0 ?  this._likes : "";
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".post__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._cardId, this._element);
      });
    this._element
      .querySelector(".post__button")
      .addEventListener("click", () => {
        this._handleLikeClick(this._cardId, this._element);
      });
    this._element
      .querySelector(".post__image-button")
      .addEventListener("click", () => {
        this._handleCardClick(this._cardTitle, this._cardUrl);
      });
  }
}
