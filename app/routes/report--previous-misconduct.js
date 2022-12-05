const _ = require('lodash')

module.exports = router => {

  router.post('/report/previous-misconduct/any-previous', (req, res) => {
    res.redirect('/report/previous-misconduct/previous-misconduct')
  })

  router.post('/report/previous-misconduct/previous-misconduct', (req, res) => {
    res.redirect('/report/previous-misconduct/previous-misconduct-summary')
  })

  router.post('/report/previous-misconduct/previous-misconduct-summary', (req, res) => {
    res.redirect('/report/previous-misconduct/check-answers')
  })

  router.post('/report/previous-misconduct/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
