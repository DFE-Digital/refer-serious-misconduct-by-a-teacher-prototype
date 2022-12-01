const calendar = function () {
  // const nodes = document.body.querySelectorAll('.js-calendar-link')
  // nodes.forEach(node => { events.on('click', node, toggleDates) })

  $('.js-calendar-link').on('click', toggleDates)
  $('.govuk-checkboxes__input').on('click', checkboxChange)





  // const allCheckboxes = document.body.querySelectorAll('.govuk-checkboxes__input')
  // allCheckboxes.forEach(node => { events.on('change', node, checkboxChange) })

  function toggleDates (event) {
    event.preventDefault()
    const target = event.target
    let checkboxes

    if (target.hasAttribute('data-week')) {
      const row = target.closest('tr')
      checkboxes = row.querySelectorAll('.govuk-checkboxes__input')
      toggleCheckboxes(checkboxes)
    }

    if (target.hasAttribute('data-month')) {
      checkboxes = document.body.querySelectorAll('.govuk-checkboxes__input')
      toggleCheckboxes(checkboxes)
    }

    if (target.hasAttribute('data-day')) {
      const day = target.getAttribute('data-day')
      checkboxes = document.body.querySelectorAll(`[data-day=${day}] .govuk-checkboxes__input`)
      toggleCheckboxes(checkboxes)
    }
  }

  function checkboxChange (event) {
    const target = event.target
    toggleClass(target)
  }

  function toggleCheckboxes (checkboxes) {
    if (Array.from(checkboxes).every(node => node.checked)) {
      checkboxes.forEach(node => {
        node.checked = false
        toggleClass(node)
      })
    } else {
      checkboxes.forEach(node => {
        node.checked = true
        toggleClass(node)
      })
    }
  }

  function toggleClass (node) {
    if (node.checked === true) {
      node.closest('td').classList.add('app-calendar-unavailable-cell')
    } else {
      node.closest('td').classList.remove('app-calendar-unavailable-cell')
    }
  }
}
