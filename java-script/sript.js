const formButton = document.querySelector(".profile__info-button");
const popupForm = document.querySelector("#form");
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
const closeButton = document.querySelectorAll(".popup__close-button")
const addPostButton = document.querySelector(".profile__plus-button")
const saveButton = document.querySelector(".popup__save-button")
const cardConatiner = document.querySelector(".post-container");
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


const cardsAdder = function (object) {
  const cardTemplate = document.querySelector("#card").content;
  const cards = object.map((card) => {
    const cardElement = cardTemplate.querySelector(".post").cloneNode(true);
    cardElement.querySelector(".post__image").src = card.link;
    cardElement.querySelector(".post__heading").textContent = card.name;
    return cardElement;
  });
  cardConatiner.prepend(...cards)
  addEventListenerByClass(document.querySelectorAll(".post__button"), "click", likeButtonFn);
  addEventListenerByClass(document.querySelectorAll(".post__delete-button"), "click", deletePost);
  addEventListenerByClass(document.querySelectorAll("#image__button"), "click", openPopup);
}

cardsAdder(initialCards)


function addEventListenerByClass(elements, eventType, fn) {
  elements.forEach((element) => {
    element.addEventListener(eventType ,fn)
  });
}

function closePopup(evt) {
  const eventTarget = evt.target;
  eventTarget.parentElement.classList.remove("popup_opened");
};

function openPopup(evt) {
  const eventTarget = evt.target
  if (eventTarget.id === "profile__button") {
    popupForm.classList.add("popup_opened");
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  } else if (eventTarget.id === "plus__button") {
    popupPost.classList.add("popup_opened")
    inputTitle.value = "";
    inputLink.value = "";
  } else if (eventTarget.id === "image__button") {
    console.log(eventTarget.id)
    popupPicture.classList.add("popup_opened");
  }

}

function inputProfileData(evt) {
  evt.preventDefault();
   profileName.textContent = inputName.value;
   profileAbout.textContent = inputAbout.value;
   popupForm.classList.remove("popup_opened");
  };

function inputPostData(evt) {
  evt.preventDefault();
  const postInput = [{name: inputTitle.value, link: inputLink.value}]
  cardsAdder(postInput);
  popupPost.classList.remove("popup_opened");
  };

function deletePost(evt) {
  const eventTarget = evt.target;
  eventTarget.parentElement.remove();
}

function likeButtonFn(evt) {
  const eventTarget = evt.target;
  if (eventTarget.getAttribute("src") === "./images/like-button.svg") {
    eventTarget.src = "./images/like-button_active.svg";
  } else if (eventTarget.getAttribute("src") === "./images/like-button_active.svg") {
    eventTarget.src = "./images/like-button.svg";
  }
}

formButton.addEventListener("click", openPopup);
addPostButton.addEventListener("click", openPopup);
addEventListenerByClass(closeButton, "click", closePopup);
formProfileElement.addEventListener("submit", inputProfileData);
formPostElement.addEventListener("submit", inputPostData);

















