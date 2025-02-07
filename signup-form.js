// Return a class name in the BEM convention.
const BEM = (block, element, modifier) => {
  const BE = `${block}__${element}`;
  return modifier ? `${BE}--${modifier}` : BE;
}

const form = document.querySelector("#signup-form");
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

const formBlock = "signup-form";
const inputElement = "input";
const containerElement = "input-container-flex";
const errIconElement = "err-icon";
const errMessageElement = "err-msg";
const onErrModifier = "on-err";

const onErrClass = (element) => BEM(formBlock, element, onErrModifier);

// Add input-error modifiers to all elements associated with an input.
const addOnErr = (input) => {
  const { container, errIcon, errMessage } = getRelatives(input);
  input.classList.add(onErrClass(inputElement));
  container.classList.add(onErrClass(containerElement));
  errIcon.classList.add(onErrClass(errIconElement));
  errMessage.classList.add(onErrClass(errMessageElement));
};

// Remove input-error modifiers from all elements associated with an input.
const removeOnErr = (input) => {
  const { container, errIcon, errMessage } = getRelatives(input);
  input.classList.remove(onErrClass(inputElement));
  container.classList.remove(onErrClass(containerElement));
  errIcon.classList.remove(onErrClass(errIconElement));
  errMessage.classList.remove(onErrClass(errMessageElement));
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
  // const focusClass = `${formBlock}__input-container-flex--subfocus`;
  const focusClass = BEM(formBlock, containerElement, "subfocus");
  const container = getRelatives(input).container;

  input.addEventListener("focus", () => {
    removeOnErr(input);
    container.classList.add(focusClass);
  });

  input.addEventListener("blur", () => {
    container.classList.remove(focusClass);
  });
});

// Return true if the value of input is nonempty; false otherwise.
const isNonempty = (input) => {
  return input.value.trim() ? true : false;
}

// Return true if email is a valid email address; false otherwise.
const isValidEmail = (email) => {
  const emailRegexp = /^\w+(\.\w+)*@\w+(\.\w+)*$/g;
  return email.value.match(emailRegexp) ? true : false;
};

// Test an input against a condition and update testResults.
const test = (input, condition, testResults) => {
  const result = condition(input);
  testResults.push(result);
  if (result) {
    removeOnErr(input);
  } else {
    addOnErr(input);
  }
}

// When the form is submitted, perform client-side input validation.
form.addEventListener("submit", function (event) {
  const testResults = [];

  test(firstName, isNonempty, testResults);
  test(lastName, isNonempty, testResults);
  test(emailAddress, isValidEmail, testResults);
  test(password, isNonempty, testResults);

  const isValidInputs = testResults.every((x) => x);
  if (isValidInputs) {
    alert("All inputs are valid");
  } else {
    event.preventDefault();
  }
});
