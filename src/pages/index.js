import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { postsContainer, settings } from "../utils/consts.js";
import { Api, } from "../components/Api.js"
import PopupSubmit from "../components/PopupSubmit.js";

//declarings consts of the dom elements that in index.html

const editForm = document.querySelector("#form__profile");
const postForm = document.querySelector("#form__post");
const avatarForm = document.querySelector("#form__avatar");
const openEditProfileFormBtn = document.querySelector(".profile__info-button");
const openAddCardFromBtn = document.querySelector(".profile__plus-button");
const openEditAvatarBtn = document.querySelector(".profile__image-button");
const userNameInput = document.querySelector("#name");
const userAboutInput = document.querySelector("#about");



//declaring an instance of Api class for requesting or editing data

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "fd1068ae-504b-49a0-9d62-632d18414be1",
    "Content-Type": "application/json",
  },
});





// declaring a UserInfo class that can show the current user data -
// - and render the data from the input fields to the page via its methods.
// also this class stores other user data for later use

const renderedUserInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userAboutSelector: ".profile__subtitle",
  userAvatarSelector: ".profile__image"
});

//using the instance of the Api class to get the current user data
//then passing it to the method of the UserInfo class
//to render the current user data


api.getUserInfo().then((res) => {
  renderedUserInfo.setUserInfo(res);
  renderedUserInfo.updateUserAvatar(res);
})
.catch((err) => {
  console.log(err);
});





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



//constructing a handler that will edit the amount of likes of a card
//(on the server and on the like counter of the card) triggered by a click on the button
//the handler is using the  2 api methods

const likeCardPatch = (cardId, thisCard) => {
  if (
    !thisCard
      .querySelector(".post__button")
      .classList.contains("post__button_active")
  ) {
    api
      .addLike(cardId)
      .then((res) => {
        thisCard.querySelector(".post__like-counter").textContent =
          res.likes.length;
        thisCard
          .querySelector(".post__button")
          .classList.toggle("post__button_active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (
    thisCard
      .querySelector(".post__button")
      .classList.contains("post__button_active")
  ) {
    api
      .removeLike(cardId)
      .then((res) => {
        thisCard.querySelector(".post__like-counter").textContent =
          res.likes.length > 0 ? res.likes.length : "";
        thisCard
          .querySelector(".post__button")
          .classList.toggle("post__button_active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};



const deletePostHendler = (cardId, cardElement) => {
  api.deleteCard(cardId).then(() => {
    cardElement.remove();
    cardElement = null;
  })
  .catch((err) => {
    console.log(err);
  });
}

const popupDeleteCard = new PopupSubmit("#delete-post__popup", deletePostHendler);
popupDeleteCard.setEventListeners();

//delete click handlers





const deleteCLickHandler = (cardId, cardElement) => popupDeleteCard.open(cardId, cardElement)









// a function that generate a card via the Card class -
// the function will be passed as a callback to  the Section class instance

const cardRenderer = (
  cardData,
  cardTamplateSelector,
  { handleCardClick },
  { handleLikeClick },
  { handleDeleteClick },
  attachItemMethod,
) => {
  const postCard = new Card(
    cardData,
    cardTamplateSelector,
    { handleCardClick },
    { handleLikeClick },
    { handleDeleteClick }
  );
  const cardCreated = postCard.createCard();
  //checking if liked a card among the rendered initial cards, then setting thier like button active
  if (cardData.likes.some((entry) => entry._id == renderedUserInfo.id)) {
    cardCreated.querySelector(".post__button").classList.add("post__button_active");
  }
  //checking if the initial cards don't have my id to disable there delete button
  if (cardData.owner._id !== renderedUserInfo.id) {
    cardCreated.querySelector(".post__delete-button").setAttribute("disabled", true);
    cardCreated.querySelector(".post__delete-button").classList.add("post__delete-button_hiden")
  }

  cardSection.addItem(cardCreated, attachItemMethod);

};



//declaring an instance of Section class for rendering cards to the dom

const cardSection = new Section(
  {
    renderer: (cardData) => {
      cardRenderer(
        cardData,
        "#card",
        {
          handleCardClick: openPicturePopupHandler
        },
        {
          handleLikeClick: likeCardPatch
        },
        {
          handleDeleteClick: deleteCLickHandler
        },
      );
    },
  },
  postsContainer
);



//using the api method to recive the initial cards data
//then passing it to the method of the section class
//to render the initial cards

api.getInitialCards().then(res => {
  cardSection.renderItems(res);
})
.catch((err) => {
  console.log(err);
});











// a handler that renders the data from the form -
// - to the page via UserInfo class method.
//and sends the data to the server.

const submitProfileForm = (newUserData) => {
  api.editUserInfo(newUserData)
  .catch((err) => {
    console.log(err);
  });
  renderedUserInfo.setUserInfo(newUserData);
  popupEditProfile.close();
};


const submitAvatarForm = (newUserData) => {
  api.editAvatar(newUserData)
  .catch((err) => {
    console.log(err);
  });
  renderedUserInfo.updateUserAvatar(newUserData);
  popupEditAvatar.close();
};

// declaring the the proper popup class and setting thier eventlisters

const popupEditProfile = new PopupWithForm(
  "#edit-profile__popup",
  submitProfileForm
);
popupEditProfile.setEventListeners();


const popupEditAvatar = new PopupWithForm(
  "#edit-profile-picture__popup",
  submitAvatarForm
);
popupEditAvatar.setEventListeners();



const popupAddCard = new PopupWithForm("#add-post__popup", (cardData) => {
  api.addPostCard(cardData).then((res) => {
    cardRenderer(
      res,
      "#card",
      {
        handleCardClick: openPicturePopupHandler
      },
      {
        handleLikeClick: likeCardPatch
      },
      {
        handleDeleteClick: deleteCLickHandler
      },
      "prepend"
    );
    popupAddCard.close();
  })
  .catch((err) => {
    console.log(err);
  });
});
popupAddCard.setEventListeners();





// form valiadation:

const editFormValidator = new FormValidator(settings, editForm);
const postFormValidator = new FormValidator(settings, postForm);
const avatarFormValidator = new FormValidator(settings, avatarForm);

editFormValidator.enableValidation();
postFormValidator.enableValidation();
avatarFormValidator.enableValidation();



// attaching event listenrs to buttons og the page

openEditProfileFormBtn.addEventListener("click", function () {
  const userCurrentData = renderedUserInfo.getUserInfo();
  userNameInput.value = userCurrentData.name;
  userAboutInput.value = userCurrentData.about;
  popupEditProfile.open();
});

openAddCardFromBtn.addEventListener("click", function () {
  popupAddCard.open();
  postFormValidator.enableValidation(); 
});

openEditAvatarBtn.addEventListener("click", function () {
  popupEditAvatar.open();
  avatarFormValidator.enableValidation();
});

