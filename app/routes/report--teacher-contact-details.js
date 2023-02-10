const _ = require('lodash')
const referralHelper = require('../helpers/referral')

module.exports = router => {

  router.post('/report/teacher-contact-details/email', (req, res) => {
    res.redirect('/report/teacher-contact-details/telephone')
  })

  router.post('/report/teacher-contact-details/telephone', (req, res) => {
    res.redirect('/report/teacher-contact-details/know-address')
  })

  router.post('/report/teacher-contact-details/know-address', (req, res) => {
    if(req.session.data.report.teacherContactDetails.knowHomeAddress == 'Yes') {
      res.redirect('/report/teacher-contact-details/address')
    } else {
      res.redirect('/report/teacher-contact-details/check-answers')
    }
  })

  router.post('/report/teacher-contact-details/address', (req, res) => {
    res.redirect('/report/teacher-contact-details/check-answers')
  })

  router.get('/report/teacher-contact-details/check-answers', (req, res) => {
    res.render('report/teacher-contact-details/check-answers', {
      teacherContactDetailsIncompleteSection: referralHelper.getFirstIncompleteQuestionFromTeacherContactDetails(req.session.data)
    })
  })

  router.post('/report/teacher-contact-details/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
