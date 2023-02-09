const _ = require('lodash')
const referralHelper = require('../helpers/referral')

module.exports = router => {

  router.post('/report/teacher/name', (req, res) => {
    if(res.locals.isPublic) {
      res.redirect('/report/teacher/check-answers')
    } else {
      res.redirect('/report/teacher/dob')
    }
  })

  router.post('/report/teacher/dob', (req, res) => {
    res.redirect('/report/teacher/nino')
  })

  router.post('/report/teacher/nino', (req, res) => {
    res.redirect('/report/teacher/trn')
  })

  router.post('/report/teacher/trn', (req, res) => {
    res.redirect('/report/teacher/qts')
  })

  router.post('/report/teacher/qts', (req, res) => {
    res.redirect('/report/teacher/check-answers')
  })

  router.get('/report/teacher/check-answers', (req, res) => {
    res.render('report/teacher/check-answers', {
      teacherDetailsIncompleteSection: referralHelper.getFirstIncompleteQuestionFromTeacherDetails(req.session.data)
    })
  })

  router.post('/report/teacher/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
