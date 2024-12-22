const emailInputContainers = document.querySelectorAll('.fieldset .email-input');
const getStartedButtons = document.querySelectorAll('.fieldset .submit-btn');

function handleInputPlaceholderOnFocus(placeholderElement) {
  placeholderElement.classList.add('input-focus');
}

function handleInputPlaceholderOnBlur(event, placeholderElement) {
  if (event.target.value == '') {
    placeholderElement.classList.remove('input-focus');
  }
}

emailInputContainers.forEach(emailInputContainer => {
  const placeholderElement = emailInputContainer.querySelector('label[for="email"]');
  const inputElement = emailInputContainer.querySelector('.input-container #email');

  inputElement.addEventListener('focus', () => {
    handleInputPlaceholderOnFocus(placeholderElement);
  });

  inputElement.addEventListener('click', () => {
    handleInputPlaceholderOnFocus(placeholderElement);
  });

  inputElement.addEventListener('blur', event => {
    handleInputPlaceholderOnBlur(event, placeholderElement);
  });
});

getStartedButtons.forEach(getStartedButton => {
  getStartedButton.addEventListener('click', event => {
    event.preventDefault();
    const inputElement = event.target.closest('.fieldset').querySelector('input');
    inputElement.focus();
  });
});