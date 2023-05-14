import professions from './data/professions.js'

document.addEventListener('DOMContentLoaded', () => {
  const professionSelect = document.querySelector('.profession-select')
  const professionInput = document.querySelector('.profession-select__input')
  professionInput.addEventListener('input', () => {
    const filteredProfession = []
    const professionInputValue = professionInput.value.trim().toLowerCase()

    if (professionInputValue.length > 0) {
      professions.every((profession) => {
        if (profession.toLowerCase().startsWith(professionInputValue)) {
          filteredProfession.push(profession)
        }
        return filteredProfession.length < 5 // break loop
      })
    }
    updateProfessionList(filteredProfession)
  })

  const professionList = document.querySelector('.profession-select__list')
  professionList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('profession-select__list-elem')) {
      professionInput.value = evt.target.innerText
      professionSelect.classList.remove('profession-select--dropdown-show')
    }
  })

  const updateProfessionList = (professionArr) => {
    professionList.innerHTML = ''
    if (professionArr.length > 0) {
      professionArr.forEach((profession) => {
        professionList.insertAdjacentHTML("beforeend", `<li class="profession-select__list-elem">${profession}</li>`)
      })
      professionSelect.classList.add('profession-select--dropdown-show')
    } else {
      professionSelect.classList.remove('profession-select--dropdown-show')
    }
  }

  // Click outside
  document.addEventListener('click', (evt) => {
    if (!professionSelect.contains(evt.target)) {
      professionSelect.classList.remove('profession-select--dropdown-show')
    }
  })
})