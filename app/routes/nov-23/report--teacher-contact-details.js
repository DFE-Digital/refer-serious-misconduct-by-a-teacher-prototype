const _ = require('lodash')
const referralHelper = require('../../helpers/referral')

var v = '/nov-23/'

module.exports = router => {

  router.post(v + 'report/teacher-contact-details/email', (req, res) => {
    res.redirect(v + 'report/teacher-contact-details/telephone')
  })

  router.post(v + 'report/teacher-contact-details/telephone', (req, res) => {
    res.redirect(v + 'report/teacher-contact-details/know-address')
  })

  router.post(v + 'report/teacher-contact-details/know-address', (req, res) => {
    if(req.session.data.report.teacherContactDetails.knowHomeAddress == 'Yes') {
      res.redirect(v + 'report/teacher-contact-details/address')
    } else {
      res.redirect(v + 'report/teacher-contact-details/check-answers')
    }
  })

  router.post(v + 'report/teacher-contact-details/address', (req, res) => {
    res.redirect(v + 'report/teacher-contact-details/check-answers')
  })

  router.get(v + 'report/teacher-contact-details/check-answers', (req, res) => {
    res.render('report/teacher-contact-details/check-answers', {
      teacherContactDetailsIncompleteSection: referralHelper.getFirstIncompleteQuestionFromTeacherContactDetails(req.session.data)
    })
  })

  router.post(v + 'report/teacher-contact-details/check-answers', (req, res) => {
    res.redirect(v + 'report')
  })

}
