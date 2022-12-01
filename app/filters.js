const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

const slugify = require('slugify')

addFilter('slugify', function(string) {
  return slugify(string, {
    replacement: '-',
    remove: /[*+~.,()'"!?:@–]/g,
    lower: true
  })
})

addFilter('firstLetter', string => {
  return string.charAt(0)
})

addFilter('noOrphans', string => {
  const indexOfLastSpace = string.lastIndexOf(' ')

  // If there’s only one word, we don’t need this filter
  if (indexOfLastSpace === -1) {
    return string
  }

  const begin = string.substring(0, indexOfLastSpace)
  const end = string.substring(indexOfLastSpace + 1)
  return `${begin}&nbsp;${end}`
})
