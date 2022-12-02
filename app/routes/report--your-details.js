const _ = require('lodash')

module.exports = router => {

  router.post('/report/your-details/name', (req, res) => {
    if(res.locals.isPublic) {
      res.redirect('/report/your-details/relationship-to')
    } else {
      res.redirect('/report/your-details/job-title')
    }
  })

  router.post('/report/your-details/job-title', (req, res) => {
    res.redirect('/report/your-details/telephone')
  })

  router.post('/report/your-details/relationship-to', (req, res) => {
    res.redirect('/report/your-details/telephone')
  })

  router.post('/report/your-details/telephone', (req, res) => {
    res.redirect('/report/your-details/check-answers')
  })

  router.post('/report/your-details/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
