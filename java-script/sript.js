let popupButton = document.querySelector(".profile-info__button");
let popup = document.querySelector(".popup");

function openClosePopup() {
  popup.classList.toggle("popup_opened")
};

popupButton.addEventListener("click", openClosePopup);


let closeButton = popup.querySelector(".popup__close-button")

closeButton.addEventListener("click", openClosePopup);

let profileName = document.querySelector(".profile__title");
let profileAbout = document.querySelector(".profile__subtitle");
let saveButton = popup.querySelector(".popup__save-button");


function inputData() {
let inputName = document.querySelector("#name");
let inputAbout = document.querySelector("#about");
console.log(inputName.value)
console.log(inputAbout.value)
 profileName.textContent = inputName.value;
 console.log(profileName.textContent)
 profileAbout.textContent = inputAbout.value;
 console.log(profileAbout.textContent)
};

saveButton.addEventListener("click", inputData);
saveButton.addEventListener("click", openClosePopup);

likeButton = document.querySelector(".like-button");
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

