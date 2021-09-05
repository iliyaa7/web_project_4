const cardsAdder = function (object) {
  const cardTemplate = document.querySelector("#card").content;
  const cards = object.map((card) => {
    const cardElement = cardTemplate.querySelector(".post").cloneNode(true);
    cardElement.querySelector(".post__image").src = card.link;
    cardElement.querySelector(".post__image").alt = "A photo of " + card.name;
    cardElement.querySelector(".post__heading").textContent = card.name;
    return cardElement;
  });
  cardContainer.prepend(...cards)
  addEventListenerByClass(document.querySelectorAll(".post__button"), "click", toggleCardLike);
  addEventListenerByClass(document.querySelectorAll(".post__delete-button"), "click", deletePost);
  addEventListenerByClass(document.querySelectorAll("#image__button"), "click", openPopup);
}
