export default class Card {
    constructor(cardTitle, cardUrl, templateSelector) {
      this._cardTitle = cardTitle;
      this._cardUrl = cardUrl;
      this._templateSelector = templateSelector;
    }
   
    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".post")
      .cloneNode(true);
  
      return cardElement;
    }
  
    createCard() {
      this._element = this._getTemplate();
      this._element.querySelector(".post__heading").textContent = this._cardTitle;
      this._element.querySelector(".post__image").alt = "A photo of " + this._cardTitle;
      this._element.querySelector(".post__image").src = this._cardUrl;
      this._setEventListeners();
      return this._element;
    }
  
    _setEventListeners() {
      this._element.querySelector(".post__delete-button").addEventListener("click", () => {
        this._handleDeletePost();
      });
      this._element.querySelector(".post__button").addEventListener("click", () => {
        this._handleToggleCardLike();
      }); 
    }
  
    _handleToggleCardLike() {
      this._element.querySelector(".post__button").classList.toggle("post__button_active")
    }
  
    _handleDeletePost(evt) {
      this._element.remove();
    }  
  }