const _ = require('lodash')

module.exports = router => {

  router.post('/report/teacher/name', (req, res) => {
    res.redirect('/report/teacher/age')
  })

  router.post('/report/teacher/age', (req, res) => {
    if(res.locals.isPublic) {
      res.redirect('/report/teacher/check-answers')
    } else {
      res.redirect('/report/teacher/nino')
    }
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

  router.post('/report/teacher/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
