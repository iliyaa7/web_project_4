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
    addEventListenerByClass(cardElement.querySelectorAll("#image__button"), "click", openPicturePopup);
    addEventListenerByClass(cardElement.querySelectorAll(".post__button"), "click", toggleCardLike);
    addEventListenerByClass(cardElement.querySelectorAll(".post__delete-button"), "click", deletePost);
    return cardElement;
}

function addCard(object) {
  const cards = object.map((card) => {
    const cardsCreated = createCard(card.name, card.link);
    return cardsCreated;
  });
  cardContainer.prepend(...cards);
}

addCard(initialCards);


function addEventListenerByClass(elements, eventType, fn) {
  elements.forEach((element) => {
    element.addEventListener(eventType ,fn)
  });
}


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.add("popup__form-input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__form-input-error_active");
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.remove("popup__form-input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__form-input-error_active");
}

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__form-input"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();



function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function openEditProfileForm() {
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function openPostPopup() {
  openPopup(popupPost);
  inputTitle.value = "";
  inputLink.value = "";
}

function openPicturePopup(evt) {
  const eventTarget = evt.target;
  openPopup(popupPicture);
  pictureLink.src = eventTarget.src;
  pictureLink.alt = "A picture of " + eventTarget.parentElement.nextElementSibling.firstElementChild.textContent;
  pictureCaption.textContent = eventTarget.parentElement.nextElementSibling.firstElementChild.textContent;
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

openEditProfileFormBtn.addEventListener("click", openEditProfileForm);
addPostButton.addEventListener("click", openPostPopup);
formCloseButton.addEventListener("click", function() {closePopup(popupEditProfile)});
postCloseButton.addEventListener("click", function() {closePopup(popupPost)});
pictureCloseButton.addEventListener("click", function() {closePopup(popupPicture)});
formProfileElement.addEventListener("submit", submitEditProfileForm);
formPostElement.addEventListener("submit", submitAddCardForm);

















