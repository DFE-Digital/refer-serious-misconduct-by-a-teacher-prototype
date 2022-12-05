const _ = require('lodash')

module.exports = router => {

  router.post('/report/teacher-role/start-date', (req, res) => {
    res.redirect('/report/teacher-role/end-date')
  })

  router.post('/report/teacher-role/end-date', (req, res) => {
    res.redirect('/report/teacher-role/job-title')
  })

  router.post('/report/teacher-role/job-title', (req, res) => {
    res.redirect('/report/teacher-role/school')
  })

  router.post('/report/teacher-role/school', (req, res) => {
    res.redirect('/report/teacher-role/duties')
  })

  router.post('/report/teacher-role/duties', (req, res) => {
    if(res.locals.isPublic) {
      res.redirect('/report/teacher-role/check-answers')
    } else {
      res.redirect('/report/teacher-role/teaching-somewhere-else')
    }
  })

  router.post('/report/teacher-role/teaching-somewhere-else', (req, res) => {
    if(req.session.data.report['teacher-role']['teaching-elsewhere'] == 'Yes') {
      res.redirect('/report/teacher-role/teaching-where-now')
    } else {
      res.redirect('/report/teacher-role/check-answers')
    }
  })

  router.post('/report/teacher-role/teaching-where-now', (req, res) => {
    res.redirect('/report/teacher-role/check-answers')
  })

  router.post('/report/teacher-role/check-answers', (req, res) => {
    res.redirect('/report')
  })
}
