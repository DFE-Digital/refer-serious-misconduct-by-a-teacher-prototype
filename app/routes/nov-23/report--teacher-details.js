const _ = require('lodash')
const referralHelper = require('../../helpers/referral')

var v = '/nov-23/'

module.exports = router => {

  router.post(v + 'report/teacher/name', (req, res) => {
    if(res.locals.isPublic) {
      res.redirect(v + 'report/teacher/check-answers')
    } else {
      res.redirect(v + 'report/teacher/dob')
    }
  })

  router.post(v + 'report/teacher/dob', (req, res) => {
    res.redirect(v + 'report/teacher/nino')
  })

  router.post(v + 'report/teacher/nino', (req, res) => {
    res.redirect(v + 'report/teacher/trn')
  })

  router.post(v + 'report/teacher/trn', (req, res) => {
    res.redirect(v + 'report/teacher/qts')
  })

  router.post(v + 'report/teacher/qts', (req, res) => {
    res.redirect(v + 'report/teacher/check-answers')
  })

  router.get(v + 'report/teacher/check-answers', (req, res) => {
    res.render('report/teacher/check-answers', {
      teacherDetailsIncompleteSection: referralHelper.getFirstIncompleteQuestionFromTeacherDetails(req.session.data)
    })
  })

  router.post(v + 'report/teacher/check-answers', (req, res) => {
    res.redirect(v + 'report')
  })

}
