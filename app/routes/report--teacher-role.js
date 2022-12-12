const _ = require('lodash')

module.exports = router => {

  router.post('/report/teacher-role/start-date', (req, res) => {
    res.redirect('/report/teacher-role/job-title')
  })

  router.post('/report/teacher-role/job-title', (req, res) => {
    res.redirect('/report/teacher-role/same-organisation')
  })

  router.post('/report/teacher-role/same-organisation', (req, res) => {
    if(req.session.data.report['teacher-role']['same-organisation'] === 'Yes') {
      res.redirect('/report/teacher-role/duties')
    } else {
      res.redirect('/report/teacher-role/know-where-they-worked')
    }
  })

  router.post('/report/teacher-role/know-where-they-worked', (req, res) => {
    if(req.session.data.report['teacher-role']['know-where-they-worked'] === 'Yes') {
      res.redirect('/report/teacher-role/where-they-worked')
    } else {
      res.redirect('/report/teacher-role/duties')
    }
  })

  router.post('/report/teacher-role/where-they-worked', (req, res) => {
    res.redirect('/report/teacher-role/duties')
  })

  router.post('/report/teacher-role/school', (req, res) => {
    res.redirect('/report/teacher-role/duties')
  })

  router.post('/report/teacher-role/duties', (req, res) => {
    if(_.get(req.session.data, 'report[type-of-report]') == 'public') {
      res.redirect('/report/teacher-role/check-answers')
    } else {
      res.redirect('/report/teacher-role/still-employed')
    }
  })

  router.post('/report/teacher-role/still-employed', (req, res) => {
    if(req.session.data.report['teacher-role']['still-employed'] === 'No') {
      res.redirect('/report/teacher-role/when-they-left')
    } else {
      res.redirect('/report/teacher-role/check-answers')
    }
  })

  router.post('/report/teacher-role/when-they-left', (req, res) => {
    res.redirect('/report/teacher-role/why-they-left')
  })

  router.post('/report/teacher-role/why-they-left', (req, res) => {
    res.redirect('/report/teacher-role/teaching-somewhere-else')
  })

  router.post('/report/teacher-role/teaching-somewhere-else', (req, res) => {
    if(req.session.data.report['teacher-role']['teaching-elsewhere'] == 'Yes') {
      res.redirect('/report/teacher-role/know-where-they-work')
    } else {
      res.redirect('/report/teacher-role/check-answers')
    }
  })

  router.post('/report/teacher-role/know-where-they-work', (req, res) => {
    if(req.session.data.report['teacher-role']['know-where-they-work'] === 'Yes') {
      res.redirect('/report/teacher-role/where-they-work')
    } else {
      res.redirect('/report/teacher-role/check-answers')
    }
  })

  router.post('/report/teacher-role/where-they-work', (req, res) => {
    res.redirect('/report/teacher-role/check-answers')
  })

  router.post('/report/teacher-role/check-answers', (req, res) => {
    res.redirect('/report')
  })
}
