const openEditProfileFormBtn = document.querySelector(".profile__info-button");
const popupEditProfile = document.querySelector("#form");
const popupPost = document.querySelector("#post");
const popupPicture = document.querySelector("#picture")
const inputName = document.querySelector("#name");
const inputAbout = document.querySelector("#about");
const inputTitle = document.querySelector("#title");
const inputLink = document.querySelector("#link");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__subtitle");
const pictureCaption = document.querySelector(".popup__caption");
const pictureLink = document.querySelector("#popup__image");
const formProfileElement = document.querySelector("#form__profile");
const formPostElement = document.querySelector("#form__post");
const formCloseButton = document.querySelector("#close__form");
const postCloseButton = document.querySelector("#close__post");
const pictureCloseButton = document.querySelector("#close__picture");
const addPostButton = document.querySelector(".profile__plus-button")
const cardContainer = document.querySelector(".post-container");
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];


class Card {
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

function renderCards(cardsObject) {
  const cards = cardsObject.map((card) => {
    const cardCreated = new Card(card.name, card.link, "#card");
    return cardCreated.createCard();
  });
  cardContainer.prepend(...cards);
  addEventListenerByClass(cards, "click", openPicturePopup);
}

renderCards(initialCards);


function addEventListenerByClass(elements, eventType, fn) {
  elements.forEach((element) => {
    element.addEventListener(eventType ,fn)
  });
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOpenedPopup);
  document.removeEventListener("click", closePopupByOverlayClick);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOpenedPopup);
  document.addEventListener("click", closePopupByOverlayClick);
}

function openEditProfileForm() {
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function openPostPopup() {
  openPopup(popupPost);
  formPostElement.reset();
}

function openPicturePopup(evt) {
  if (evt.target.id === "image__button-image") {
    openPopup(popupPicture);
    pictureLink.src = evt.target.src;
    pictureLink.alt = "A picture of " + evt.currentTarget.querySelector(".post__heading").textContent;
    pictureCaption.textContent = evt.currentTarget.querySelector(".post__heading").textContent;
  }
}


function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEditProfile);
}


function submitAddCardForm(evt) {
  evt.preventDefault();
  const postInput = [{name: inputTitle.value, link: inputLink.value}]
  renderCards(postInput);
  closePopup(popupPost);
  };

function deletePost(evt) {
  const cardElement = evt.target.parentElement;
  cardElement.remove();
  cardElement = null;
} 

function toggleCardLike(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle("post__button_active")
}

const openedPopupFinder = () => {
  return document.querySelector(".popup_opened");
};

function closeOpenedPopup(evt) {
  if(evt.key === "Escape") {
    closePopup(openedPopupFinder());
  }
};

function closePopupByOverlayClick(evt) {
  if(evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
};

openEditProfileFormBtn.addEventListener("click", openEditProfileForm);
addPostButton.addEventListener("click", openPostPopup);
formCloseButton.addEventListener("click", function() {closePopup(popupEditProfile)});
postCloseButton.addEventListener("click", function() {closePopup(popupPost)});
pictureCloseButton.addEventListener("click", function() {closePopup(popupPicture)});
formProfileElement.addEventListener("submit", submitEditProfileForm);
formPostElement.addEventListener("submit", submitAddCardForm);

