const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.add("popup__form-input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__form-input-error_active");
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.remove("popup__form-input_type_error");
  errorElement.classList.remove("popup__form-input-error_active");
  errorElement.textContent = "";
}

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => inputList.some((inputElement) => ! inputElement.validity.valid);

const toggleSubmitButton = (inputList, submmitButton) => {
  if (hasInvalidInput(inputList)) {
    submmitButton.classList.add("popup__save-button_disabled");
    submmitButton.setAttribute("disabled", "true")
  } else {
    submmitButton.classList.remove("popup__save-button_disabled");
    submmitButton.removeAttribute("disabled");
  }
}

const setEventListeners = (formElement) => {
  const submmitButton = formElement.querySelector(".popup__save-button")
  const inputList = Array.from(formElement.querySelectorAll(".popup__form-input"));
  toggleSubmitButton(inputList, submmitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleSubmitButton(inputList, submmitButton);
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

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});

