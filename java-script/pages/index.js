import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js"
import { openEditProfileFormBtn , openAddCardFromBtn, userNameInput , userAboutInput , initialCards , editForm , postForm , settings } from "../utils/consts.js";





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


// declaring a UserInfo class that can show the current user data -
// - and render the data from the inpt fields to the page via its methods.

const renderedUserInfo = new UserInfo({userNameSelector: ".profile__title", userAboutSelector: ".profile__subtitle"});





// a handler that will add a card.
// the card will be generated -
// - from the data that in the input fields of the form.
// - the hendler is attached to the form as a hendler -
// - of a "submmit" event.

const submitAddCardForm = (cardDataArray) => {
  const renderedFormCard = new Section(
    {
      items: [cardDataArray],
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
};






// a handler that renders the data from the form -
// - to the page via UserInfo class method.

export const submitProfileForm = () => {
  renderedUserInfo.setUserInfo();
};





// declaring the the proper popup class and setting thier eventlisters


const popupEditProfile = new PopupWithForm("#form", submitProfileForm)
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm("#post", submitAddCardForm);
popupAddCard.setEventListeners();



// form valiadation:
const editFormValidator = new FormValidator(settings, editForm);
const postFormValidator = new FormValidator(settings, postForm);

editFormValidator.enableValidation();
postFormValidator.enableValidation();



// attaching event listenrs to buttons og the page

openEditProfileFormBtn.addEventListener("click", function() {
  popupEditProfile.open();
  const UserCurrentData = renderedUserInfo.getUserInfo();
  userNameInput.value = UserCurrentData.fullname;
  userAboutInput.value = UserCurrentData.about;
});

openAddCardFromBtn.addEventListener("click", function() {popupAddCard.open()});


