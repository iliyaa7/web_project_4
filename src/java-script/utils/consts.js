import logoImg from "../../images/Logo.svg";
import profileImg from "../../images/profile-photo.png"
import profileButtonImg from "../../images/batton-prof_edit.svg"
import plusButtonImg from "../../images/batton-plus.svg"

export const openEditProfileFormBtn = document.querySelector(
  ".profile__info-button"
);
export const openAddCardFromBtn = document.querySelector(
  ".profile__plus-button"
);
export const userNameInput = document.querySelector("#name");
export const userAboutInput = document.querySelector("#about");
export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
export const editForm = document.querySelector("#form__profile");
export const postForm = document.querySelector("#form__post");
export const settings = {
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__form-input-error_active",
};

//setting images to the html page -
// - via the import that was made at the top of the page

const logoImage = document.querySelector("#logo-image");
logoImage.src = logoImg;

const profileImage = document.querySelector("#profile-image");
profileImage.src = profileImg;

const profileButtonImage = document.querySelector("#profile-button");
profileButtonImage.src = profileButtonImg;

const plusButtonImage = document.querySelector("#plus-button");
plusButtonImage.src = plusButtonImg;


