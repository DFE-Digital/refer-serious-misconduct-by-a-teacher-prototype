const _ = require('lodash')
const referralHelper = require('../helpers/referral')

module.exports = router => {

  router.post('/report/previous-misconduct/any-previous', (req, res) => {
    if(req.session.data.report.previousMisconduct.anyPrevious == 'Yes') {
      res.redirect('/report/previous-misconduct/previous-misconduct')
    } else {
      res.redirect('/report/previous-misconduct/check-answers')
    }
  })

  router.post('/report/previous-misconduct/previous-misconduct', (req, res) => {
    res.redirect('/report/previous-misconduct/check-answers')
  })

  router.get('/report/previous-misconduct/check-answers', (req, res) => {
    res.render('report/previous-misconduct/check-answers', {
      previousAllegationsIncompleteSection: referralHelper.getFirstIncompleteQuestionFromPreviousAllegations(req.session.data)
    })
  })

  router.post('/report/previous-misconduct/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
