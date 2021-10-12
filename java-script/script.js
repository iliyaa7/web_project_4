import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";








const openEditProfileFormBtn = document.querySelector(".profile__info-button");
const openAddCardFromBtn = document.querySelector(".profile__plus-button");
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









// declaring the the proper popup class.
// the .open() method of the class will open a popup -
// - that will be generated from the card data.
// the method will be added via a hendler -
// - for each card that will be renderd to the page.

const openPicturePopup = new PopupWithImage("#picture");
openPicturePopup.setEventListeners();
const openPicturePopupHendler = (name, link) => {
  openPicturePopup.open(name, link);
}






// rendering the initial cards of the page

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






// form valiadation:
const editFormValidator = new FormValidator(settings, editForm);
const postFormValidator = new FormValidator(settings, postForm);

editFormValidator.enableValidation();
postFormValidator.enableValidation();








// a hendler that will add a card.
// the card will be generated -
// - from the data that in the input fields of the form.
// - the hendler is attached to the form as a hendler -
// - of a "submmit" event.

const submitAddCardForm = (cardDataArray) => {
  const renderedFormCard = new Section(
    {
      items: [cardDataArray],
      renderer: (cardData) => {
        console.log(cardData)
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
};





const popupEditProfiles = new Popup("#form")
const popupAddCard = new PopupWithForm("#post", submitAddCardForm);
popupAddCard.setEventListeners();

openEditProfileFormBtn.addEventListener("click", function() {popupEditProfiles.open()});
openAddCardFromBtn.addEventListener("click", function() {popupAddCard.open()});


