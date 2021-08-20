let popupButton = document.querySelector(".profile__info-button");
let popup = document.querySelector(".popup");

function openClosePopup() {
  popup.classList.toggle("popup_opened")
};

popupButton.addEventListener("click", openClosePopup);


let closeButton = popup.querySelector(".popup__close-button")

closeButton.addEventListener("click", openClosePopup);

let profileName = document.querySelector(".profile__title");
let profileAbout = document.querySelector(".profile__subtitle");
let formElement = document.querySelector(".popup__container");
let saveButton = document.querySelector(".popup__save-button")

function inputData(evt) {
evt.preventDefault();
let inputName = document.querySelector("#name");
let inputAbout = document.querySelector("#about");
 profileName.textContent = inputName.value;
 profileAbout.textContent = inputAbout.value;
};

formElement.addEventListener("submit", inputData);
saveButton.addEventListener("click", openClosePopup);


likeButton = document.querySelector(".post__like-button");
console.log(likeButton)
let srcLength = likeButton.getAttribute("src");
console.log(srcLength.length)

function activeLikeButton() {
  let srcLength = likeButton.getAttribute("src");
  if (srcLength.length <= 24) {
    likeButton.setAttribute("src", "./images/like-button_active.svg");
  } else {
    likeButton.setAttribute("src", "./images/like-button.svg");
  }
};

likeButton.addEventListener("click", activeLikeButton);

