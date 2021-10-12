import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";

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
const formProfileElement = document.querySelector("#form__profile");
const formPostElement = document.querySelector("#form__post");
const formCloseButton = document.querySelector("#close__form");
const postCloseButton = document.querySelector("#close__post");
const pictureCloseButton = document.querySelector("#close__picture");
const addPostButton = document.querySelector(".profile__plus-button")
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
const editForm = document.querySelector("#form__profile");
const postForm = document.querySelector("#form__post");
const settings = {
 inputSelector: ".popup__form-input",
 submitButtonSelector: ".popup__save-button",
 inactiveButtonClass: "popup__save-button_disabled",
 inputErrorClass: "popup__form-input_type_error",
 errorClass: "popup__form-input-error_active"
};

const openPicturePopup = new PopupWithImage("#picture")
const openPicturePopupHendler = (name, link) => {
  openPicturePopup.open(name, link);
}


const renderedInitialCards = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const postCard = new Card(cardData, "#card", {
        handleCardClick: openPicturePopupHendler
      });
      const cardCreated = postCard.createCard();
      renderedInitialCards.addItem(cardCreated);
    },
  },
  ".post-container"
);

renderedInitialCards.renderItems();










const editFormValidator = new FormValidator(settings, editForm);
const postFormValidator = new FormValidator(settings, postForm);

editFormValidator.enableValidation();
postFormValidator.enableValidation();










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






function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEditProfile);
}



function submitAddCardForm(evt) {
  evt.preventDefault();
  const renderedFormCard = new Section(
    {
      items: [{ name: inputTitle.value, link: inputLink.value }],
      renderer: (cardData) => {
        const postCard = new Card(cardData, "#card", {
          handleCardClick: openPicturePopupHendler,
        });
        const cardCreated = postCard.createCard();
        renderedFormCard.addItem(cardCreated);
      },
    },
    ".post-container"
  );
  renderedFormCard.renderItems();
  closePopup(popupPost);
};






const popupEditProfiles = new Popup("#form")
openEditProfileFormBtn.addEventListener("click", function() {popupEditProfiles.open()});
addPostButton.addEventListener("click", openPostPopup);

postCloseButton.addEventListener("click", function() {closePopup(popupPost)});
pictureCloseButton.addEventListener("click", function() {closePopup(popupPicture)});
formProfileElement.addEventListener("submit", submitEditProfileForm);
formPostElement.addEventListener("submit", submitAddCardForm);

