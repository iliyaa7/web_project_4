const popupButton = document.querySelector(".profile__info-button");
const popup = document.querySelector(".popup");
const inputName = document.querySelector("#name");
const inputAbout = document.querySelector("#about");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__subtitle");
const closeButton = popup.querySelector(".popup__close-button")

function openClosePopup() {
  popup.classList.toggle("popup_opened");
  if (popup.classList.contains("popup_opened")) {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  }
};




const formElement = document.querySelector("#form__profile");
const saveButton = document.querySelector(".popup__save-button")

function inputData(evt) {
evt.preventDefault();
 profileName.textContent = inputName.value;
 profileAbout.textContent = inputAbout.value;
 popup.classList.remove("popup_opened");
};




popupButton.addEventListener("click", openClosePopup);
closeButton.addEventListener("click", openClosePopup);
formElement.addEventListener("submit", inputData);


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

function initialCardsAdder() {
  const cardTemplate = document.querySelector("#card").content;
  const cards = initialCards.map((card) => {
    const cardElement = cardTemplate.querySelector(".post").cloneNode(true);
    cardElement.querySelector(".post__image").src = card.link;
    cardElement.querySelector(".post__heading").textContent = card.name;
    return cardElement;
  });
  console.log(cards)
  cardConatiner.prepend(...cards)
}

initialCardsAdder()

function initialCardsAdder1() {
  const cardTemplate = document.querySelector("#card").content;
  const cards = cardTemplate.querySelector(".post").cloneNode(true);
  cards.querySelector(".post__image").setAttribute("src", initialCards[1].link)
  cards.querySelector(".post__heading").textContent = initialCards[1].name;
  console.log(cards)
  cardConatiner.prepend(cards)
}




