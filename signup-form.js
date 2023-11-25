window.addEventListener('load', () => {
  const inputs = document.querySelectorAll('.signup-form__input')
  inputs.forEach((input) => {
    input.value = ''
    input.classList.remove('signup-form__input--on-err')
    input.parentElement.classList.remove('signup-form__input-container-flex--on-err')
    input.nextElementSibling.classList.remove('signup-form__err-icon--on-err')    
    input.parentElement.nextElementSibling.firstElementChild.classList.remove('signup-form__err-msg--on-err')
  })
})

const form = document.querySelector('#signup-form')

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
})