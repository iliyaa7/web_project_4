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




let formElement = document.querySelector("#form");
let saveButton = document.querySelector(".popup__save-button")

function inputData(evt) {
evt.preventDefault();
 profileName.textContent = inputName.value;
 profileAbout.textContent = inputAbout.value;
 popup.classList.remove("popup_opened");
};




popupButton.addEventListener("click", openClosePopup);
closeButton.addEventListener("click", openClosePopup);
formElement.addEventListener("submit", inputData);



