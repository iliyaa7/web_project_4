let popupButton = document.querySelector(".profile-info__button");
let popup = document.querySelector(".popup");

function openClosePopup() {
  popup.classList.toggle("popup_opened")
};

popupButton.addEventListener("click", openClosePopup);


let closeButton = popup.querySelector(".popup__close-button")

closeButton.addEventListener("click", openClosePopup);


