const formID = "signup-form"; // form id
const form = document.querySelector(`#${formID}`);

const formBlock = "signup-form"; // form block (i.e., class)
// input elements
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const emailAddress = document.querySelector("#email-address");
const password = document.querySelector("#password");
const inputs = [firstName, lastName, emailAddress, password];

// Return the relevant relatives of one of the inputs.
const getRelatives = (input) => {
  const container = input.parentElement;
  const errIcon = input.nextElementSibling;
  const errMessage = container.nextElementSibling.firstElementChild;
  return { container, errIcon, errMessage };
};

const onErr = "on-err"; //input-error BEM modifier
const onErrClass = (element) => `${formBlock}__${element}--${onErr}`;

// Add input-error modifiers to all elements associated with an input.
const addOnErr = (input) => {
  const { container, errIcon, errMessage } = getRelatives(input);
  input.classList.add(onErrClass("input"));
  container.classList.add(onErrClass("input-container-flex"));
  errIcon.classList.add(onErrClass("err-icon"));
  errMessage.classList.add(onErrClass("err-msg"));
};

// Remove input-error modifiers from all elements associated with an input.
const removeOnErr = (input) => {
  const { container, errIcon, errMessage } = getRelatives(input);
  input.classList.remove(onErrClass("input"));
  container.classList.remove(onErrClass("input-container-flex"));
  errIcon.classList.remove(onErrClass("err-icon"));
  errMessage.classList.remove(onErrClass("err-msg"));
};

// On webpage load, clear all input values and remove all error
// indicators and messages.
window.addEventListener("load", () => {
  inputs.forEach((input) => {
    input.value = "";
    removeOnErr(input);
  });
});

// When an input has focus, add a corresponding class to its container.
// When it loses focus, remove the class.
inputs.forEach((input) => {
  const focusClass = `${formBlock}__input-container-flex--subfocus`;
  const container = getRelatives(input).container;

  input.addEventListener("focus", () => {
    removeOnErr(input);
    container.classList.add(focusClass);
  });

  input.addEventListener("blur", () => {
    container.classList.remove(focusClass);
  });
});

// Return true if email is a valid email address; false otherwise.
const isValidEmail = (email) => {
  const emailRegexp = /^\w+(\.\w+)*@\w+(\.\w+)*$/g;
  if (email.match(emailRegexp) === null) {
    return false;
  }
  return true;
};

// When the form is submitted, perform some client-side input validation.
form.addEventListener("submit", function (evt) {
  evt.preventDefault();

  if (firstName.value === "") {
    addOnErr(firstName);
  } else {
    removeOnErr(firstName);
  }

  if (lastName.value === "") {
    addOnErr(lastName);
  } else {
    removeOnErr(lastName);
  }

  if (!isValidEmail(emailAddress.value)) {
    addOnErr(emailAddress);
  } else {
    removeOnErr(emailAddress);
  }

  if (password.value === "") {
    addOnErr(password);
  } else {
    removeOnErr(password);
  }

  if (
    firstName.value !== "" &&
    lastName.value !== "" &&
    isValidEmail(emailAddress.value) &&
    password.value !== ""
  ) {
    console.log("All inputs are valid.");
  }
});
