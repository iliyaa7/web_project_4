import "./pages/index.css";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import { postsContainer, initialCards, settings } from "./utils/consts.js";

//declarings consts of the dom elements that in index.html

const editForm = document.querySelector("#form__profile");
const postForm = document.querySelector("#form__post");
const openEditProfileFormBtn = document.querySelector(".profile__info-button");
const openAddCardFromBtn = document.querySelector(".profile__plus-button");
const userNameInput = document.querySelector("#name");
const userAboutInput = document.querySelector("#about");

// declaring the the proper popup class.
// the .open() method of the class will open a popup -
// - that will be generated from the card data.
// the method will be added via a handler -
// - for each card that will be renderd to the page.

const openPicturePopup = new PopupWithImage("#picture");
openPicturePopup.setEventListeners();

const openPicturePopupHandler = (name, link) => {
  openPicturePopup.open(name, link);
};

// a function generate a card via the Card class -
// - with the help of the Section class method that is declared bellow

const cardRenderer = (cardData, cardTamplateSelector, { handleCardClick }) => {
  const postCard = new Card(cardData, cardTamplateSelector, {
    handleCardClick,
  });
  const cardCreated = postCard.createCard();
  cardSection.addItem(cardCreated);
};

//declaring an instance of section class for rendering cards to the dom

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardRenderer(cardData, "#card", {
        handleCardClick: openPicturePopupHandler,
      });
    },
  },
  postsContainer
);

// rendering the initial cards of the page

cardSection.renderItems();

// declaring a UserInfo class that can show the current user data -
// - and render the data from the inpt fields to the page via its methods.

const renderedUserInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userAboutSelector: ".profile__subtitle",
});

// a handler that renders the data from the form -
// - to the page via UserInfo class method.

const submitProfileForm = (newUserData) => {
  renderedUserInfo.setUserInfo(newUserData);
};

// declaring the the proper popup class and setting thier eventlisters

const popupEditProfile = new PopupWithForm(
  "#edit-profile__popup",
  submitProfileForm
);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm("#add-post__popup", (cardData) => {
  cardRenderer(cardData, "#card", { handleCardClick: openPicturePopupHandler });
});
popupAddCard.setEventListeners();

// form valiadation:
const editFormValidator = new FormValidator(settings, editForm);
const postFormValidator = new FormValidator(settings, postForm);

editFormValidator.enableValidation();
postFormValidator.enableValidation();

// attaching event listenrs to buttons og the page

openEditProfileFormBtn.addEventListener("click", function () {
  const userCurrentData = renderedUserInfo.getUserInfo();
  userNameInput.value = userCurrentData.fullname;
  userAboutInput.value = userCurrentData.about;
  popupEditProfile.open();
});

openAddCardFromBtn.addEventListener("click", function () {
  popupAddCard.open();
});
