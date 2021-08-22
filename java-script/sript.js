let popupButton = document.querySelector(".profile__info-button");
let popup = document.querySelector(".popup");
let inputName = document.querySelector("#name");
let inputAbout = document.querySelector("#about");
let profileName = document.querySelector(".profile__title");
let profileAbout = document.querySelector(".profile__subtitle");
let closeButton = popup.querySelector(".popup__close-button")

function openClosePopup() {
  popup.classList.toggle("popup_opened");
  if (popup.classList.contains("popup_opened")) {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  }
};






let formElement = document.querySelector(".popup__container");
let saveButton = document.querySelector(".popup__save-button")

function inputData(evt) {
evt.preventDefault();
 profileName.textContent = inputName.value;
 profileAbout.textContent = inputAbout.value;
};






likeButton = document.querySelector(".post__like-button");
let srcLength = likeButton.getAttribute("src");

function activeLikeButton() {
  let srcLength = likeButton.getAttribute("src");
  if (srcLength.length <= 24) {
    likeButton.setAttribute("src", "./images/like-button_active.svg");
  } else {
    likeButton.setAttribute("src", "./images/like-button.svg");
  }
};


popupButton.addEventListener("click", openClosePopup);
closeButton.addEventListener("click", openClosePopup);
likeButton.addEventListener("click", activeLikeButton);
formElement.addEventListener("submit", inputData);
saveButton.addEventListener("click", openClosePopup);


