const _ = require('lodash')

module.exports = router => {

  router.all(['/report', '/report/*'], (req, res, next) => {
    // res.locals.signedIn = true
    // res.locals.reportService = true

    res.locals.isPublic = _.get(req.session.data, 'report[type-of-report]') == 'public'
    res.locals.isEmployer = !res.locals.isPublic

    next()
  })

}
