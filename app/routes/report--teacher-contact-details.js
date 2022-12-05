const _ = require('lodash')

module.exports = router => {

  router.post('/report/teacher-contact-details/email', (req, res) => {
    res.redirect('/report/teacher-contact-details/telephone')
  })

  router.post('/report/teacher-contact-details/telephone', (req, res) => {
    res.redirect('/report/teacher-contact-details/address')
  })

  router.post('/report/teacher-contact-details/address', (req, res) => {
    res.redirect('/report/teacher-contact-details/check-answers')
  })

  router.post('/report/teacher-contact-details/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
