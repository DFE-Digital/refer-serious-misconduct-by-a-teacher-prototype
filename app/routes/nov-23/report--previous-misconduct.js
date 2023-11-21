const _ = require('lodash')
const referralHelper = require('../../helpers/referral')

var v = '/nov-23/'

module.exports = router => {

  router.post(v + 'report/previous-misconduct/any-previous', (req, res) => {
    if(req.session.data.report.previousMisconduct.anyPrevious == 'Yes') {
      res.redirect(v + 'report/previous-misconduct/previous-misconduct')
    } else {
      res.redirect(v + 'report/previous-misconduct/check-answers')
    }
  })

  router.post(v + 'report/previous-misconduct/previous-misconduct', (req, res) => {
    res.redirect(v + 'report/previous-misconduct/check-answers')
  })

  router.get(v + 'report/previous-misconduct/check-answers', (req, res) => {
    res.render('report/previous-misconduct/check-answers', {
      previousAllegationsIncompleteSection: referralHelper.getFirstIncompleteQuestionFromPreviousAllegations(req.session.data)
    })
  })

  router.post(v + 'report/previous-misconduct/check-answers', (req, res) => {
    res.redirect(v + 'report')
  })

}
