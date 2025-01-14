const formID = 'signup-form'  // form id
const form = document.querySelector(`#${formID}`)

const formBlock = 'signup-form'  // form block (i.e., class)
// input elements
const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const emailAddress = document.querySelector('#email-address')
const password = document.querySelector('#password')
const inputs = [firstName, lastName, emailAddress, password]

// On webpage load, clear all input values and remove all error 
// indicators/massages.
window.addEventListener('load', () => {
  inputs.forEach((input) => {
    input.value = ''
    removeOnErr(input)    
  })
})

// Return the relatives of one of the inputs.
const getRelatives = (input) => {
  const container = input.parentElement
  const errIcon =  input.nextElementSibling
  const errMessage = container.nextElementSibling.firstElementChild
  return {container, errIcon, errMessage}
}

const onErr = 'on-err'  //input-error BEM modifier

const ModifiedClass = (element) => `${formBlock}__${element}--${onErr}`

// Add input-error modifiers to all elements associated with an input. 
const addOnErr = (input) => {
  const {container, errIcon, errMessage} = getRelatives(input)
  input.classList.add(ModifiedClass('input'))
  container.classList.add(ModifiedClass('input-container-flex'))
  errIcon.classList.add(ModifiedClass('err-icon'))    
  errMessage.classList.add(ModifiedClass('err-msg')) 
}

// Remove input-error modifiers from all elements associated with an input.
const removeOnErr = (input) => {
  const {container, errIcon, errMessage} = getRelatives(input)
  input.classList.remove(ModifiedClass('input'))
  container.classList.remove(ModifiedClass('input-container-flex'))
  errIcon.classList.remove(ModifiedClass('err-icon'))    
  errMessage.classList.remove(ModifiedClass('err-msg')) 
}

// Return true if email is a valid email address; false otherwise.
const isValidEmail = (email) => {
  if (email.indexOf('@') === -1) {
    return false
  }
  if (email.indexOf('@') !== email.lastIndexOf('@')) {
    return false
  }
  return true
}

form.addEventListener('submit', function(evt) {
  evt.preventDefault()

  if (firstName.value === '') {
    addOnErr(firstName)
  } else {
    removeOnErr(firstName)
  }

  if (lastName.value === '') {
    addOnErr(lastName)
  } else {
    removeOnErr(lastName)
  }

  if (!isValidEmail(emailAddress.value)) {
    addOnErr(emailAddress)
  } else {
    removeOnErr(emailAddress)
  }

  if (password.value === '') {
    addOnErr(password)
  } else {
    removeOnErr(password)
  }

})
