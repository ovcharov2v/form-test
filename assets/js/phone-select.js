import * as phoneMasks from './data/phone-masks.json'

document.addEventListener('DOMContentLoaded', () => {
  // Init mask
  const maskedElem = document.querySelector('.form-group__input--phone')
  const maskedInput = IMask(maskedElem, {
    mask: phoneMasks['ru'],
    lazy: false,
  });

  // Select
  const countryFlag = document.querySelector('.country-flag')
  if (countryFlag) {
    const valueEl = countryFlag.querySelector('.country-flag__value')
    valueEl.addEventListener('click', () => {
      valueEl.classList.toggle('country-flag__value--focus')
    })

    const optionsList = countryFlag.querySelectorAll('.country-flag__list-elem')
    if (optionsList.length) {
      optionsList.forEach((option) => {
        option.addEventListener('click', () => {
          valueEl.innerHTML = option.innerHTML
          const activeOption = countryFlag.querySelector('.country-flag__list-elem--active')
          if (activeOption) {
            activeOption.classList.remove('country-flag__list-elem--active')
          }
          option.classList.add('country-flag__list-elem--active')
          valueEl.classList.remove('country-flag__value--focus')
          maskedElem.value = ''
          maskedInput.updateValue('')
          maskedInput.updateOptions({
            mask: phoneMasks[option.dataset.country]
          })
        })
      })
    }

    // Click outside
    document.addEventListener('click', (evt) => {
      if(!countryFlag.contains(evt.target)) {
        valueEl.classList.remove('country-flag__value--focus')
      }
    })
  }
})