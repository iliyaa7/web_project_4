// a hendler that will add a card.
// the card will be generated -
// - from the data that in the input fields of the form.
// - the hendler is attached to the form as a hendler -
// - of a "submmit" event.

export const submitAddCardForm = (cardDataArray) => {
  const renderedFormCard = new Section(
    {
      items: [cardDataArray],
      renderer: (cardData) => {
        const postCard = new Card(cardData, "#card", {
          handleCardClick: openPicturePopupHendler,
        });
        const cardCreated = postCard.createCard();
        renderedFormCard.addItem(cardCreated);
      },
    },
    ".post-container"
  );
  renderedFormCard.renderItems();
};


