const detailsElementContainer = document.querySelector('.faq');

function handleDetailsOpen(event) {
  const detailsElements = detailsElementContainer.querySelectorAll('details');

  if (event.target.closest('details').open) {
    return;
  }

  detailsElements.forEach(detailsElement => {
    if (detailsElement.open) {
      detailsElement.removeAttribute('open');
      return;
    }
  });
}

detailsElementContainer.addEventListener('click', handleDetailsOpen);