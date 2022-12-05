const _ = require('lodash')

module.exports = router => {

  router.all(['/report', '/report/*'], (req, res, next) => {
    // res.locals.signedIn = true
    // res.locals.reportService = true

    res.locals.isPublic = _.get(req.session.data, 'report[type-of-report]') == 'public'
    res.locals.isEmployer = !res.locals.isPublic

    next()
  })

  router.post('/report', (req, res) => {
    res.redirect('/report/submit/review')
  })

  router.post('/report/submit/review', (req, res) => {
    res.redirect('/report/submit/declaration')
  })

  router.post('/report/submit/declaration', (req, res) => {
    res.redirect('/report/submit/confirmation')
  })

}
