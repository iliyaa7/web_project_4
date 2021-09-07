const formButton = document.querySelector(".profile__info-button");
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
const saveButton = document.querySelector(".popup__save-button")
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
const cardTemplate = document.querySelector("#card").content;


const createCard = function (cardTitle, imageUrl) {
    const cardElement = cardTemplate.querySelector(".post").cloneNode(true);
    cardElement.querySelector(".post__image").src = imageUrl;
    cardElement.querySelector(".post__image").alt = "A photo of " + cardTitle;
    cardElement.querySelector(".post__heading").textContent = cardTitle;
    return cardElement;
}

function addCard(object) {
  const cards = object.map((card) => {
    const cardsCreated = createCard(card.name, card.link);
    return cardsCreated;
  });
  cardContainer.prepend(...cards);
  addEventListenerByClass(document.querySelectorAll(".post__button"), "click", toggleCardLike);
  addEventListenerByClass(document.querySelectorAll(".post__delete-button"), "click", deletePost);
  addEventListenerByClass(document.querySelectorAll("#image__button"), "click", openPopup);
}



addCard(initialCards);


function addEventListenerByClass(elements, eventType, fn) {
  elements.forEach((element) => {
    element.addEventListener(eventType ,fn)
  });
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}


function openPopup(evt) {
  const eventTarget = evt.target
  if (eventTarget.id === "profile__button") {
    popupEditProfile.classList.add("popup_opened");
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  } else if (eventTarget.id === "plus__button") {
    popupPost.classList.add("popup_opened")
    inputTitle.value = "";
    inputLink.value = "";
  } else if (eventTarget.parentElement.id === "image__button") {
    popupPicture.classList.add("popup_opened");
    pictureLink.src = eventTarget.src;
    pictureLink.alt = "A picture of " + eventTarget.parentElement.nextElementSibling.firstElementChild.textContent;
    pictureCaption.textContent = eventTarget.parentElement.nextElementSibling.firstElementChild.textContent;
  }

}

function submitEditProfileForm(evt) {
  evt.preventDefault();
   profileName.textContent = inputName.value;
   profileAbout.textContent = inputAbout.value;
   closePopup(popupEditProfile);
  };

function submitAddCardForm(evt) {
  evt.preventDefault();
  const postInput = [{name: inputTitle.value, link: inputLink.value}]
  addCard(postInput);
  closePopup(popupPost);
  };

function deletePost(evt) {
  const eventTarget = evt.target;
  eventTarget.parentElement.remove();
}

function toggleCardLike(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle("post__button_active")
}

formButton.addEventListener("click", openPopup);
addPostButton.addEventListener("click", openPopup);
formCloseButton.addEventListener("click", closePopup);
postCloseButton.addEventListener("click", closePopup);
pictureCloseButton.addEventListener("click", closePopup);
formProfileElement.addEventListener("submit", submitEditProfileForm);
formPostElement.addEventListener("submit", submitAddCardForm);

















