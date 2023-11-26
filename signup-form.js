const getRelatives = (input) => {
  const container = input.parentElement
  const errIcon =  input.nextElementSibling
  const errMessage = container.nextElementSibling.firstElementChild
  return {container, errIcon, errMessage}
}

window.addEventListener('load', () => {
  const inputs = document.querySelectorAll('.signup-form__input')
  inputs.forEach((input) => {
    input.value = ''
    input.classList.remove('signup-form__input--on-err')

    const {container, errIcon, errMessage} = getRelatives(input)
    container.classList.remove('signup-form__input-container-flex--on-err')
    errIcon.classList.remove('signup-form__err-icon--on-err')    
    errMessage.classList.remove('signup-form__err-msg--on-err')
  })
})

const form = document.querySelector('#signup-form')

const addOnErr = (input) => {
  const {container, errIcon, errMessage} = getRelatives(input)
  input.classList.add('signup-form__input--on-err')
  container.classList.add('signup-form__input-container-flex--on-err')
  errIcon.classList.add('signup-form__err-icon--on-err')    
  errMessage.classList.add('signup-form__err-msg--on-err') 
}

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

  const firstName = document.querySelector('#first-name')
  const lastName = document.querySelector('#last-name')
  const emailAddress = document.querySelector('#email-address')
  const password = document.querySelector('#password')

  console.log(firstName.value)
  console.log(lastName.value)
  console.log(emailAddress.value)
  console.log(password.value)

  if (firstName.value === '') {
    addOnErr(firstName)
  }

  if (lastName.value === '') {
    addOnErr(lastName)
  }

  if (!isValidEmail(emailAddress.value)) {
    addOnErr(emailAddress)
  }

  if (password.value === '') {
    addOnErr(password)
  }

})