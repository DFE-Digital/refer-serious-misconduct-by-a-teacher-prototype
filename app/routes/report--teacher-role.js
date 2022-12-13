const _ = require('lodash')

module.exports = router => {

  router.post('/report/teacher-role/start-date', (req, res) => {
    res.redirect('/report/teacher-role/job-title')
  })

  router.post('/report/teacher-role/job-title', (req, res) => {
    res.redirect('/report/teacher-role/same-organisation')
  })

  router.post('/report/teacher-role/same-organisation', (req, res) => {
    if(req.session.data.report.teacherRole.sameOrganisation === 'Yes') {
      res.redirect('/report/teacher-role/duties')
    } else {
      res.redirect('/report/teacher-role/know-where-they-worked')
    }
  })

  router.post('/report/teacher-role/know-where-they-worked', (req, res) => {
    if(req.session.data.report.teacherRole.knowWhereTheyWorked === 'Yes') {
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
    if(req.session.data.report.teacherRole.stillEmployed === 'No') {
      res.redirect('/report/teacher-role/know-when-they-left')
    } else {
      res.redirect('/report/teacher-role/check-answers')
    }
  })

  router.post('/report/teacher-role/know-when-they-left', (req, res) => {
    if(req.session.data.report.teacherRole.knowWhenTheyLeft === 'Yes') {
      res.redirect('/report/teacher-role/when-they-left')
    } else {
      res.redirect('/report/teacher-role/teaching-somewhere-else')
    }
  })

  router.post('/report/teacher-role/when-they-left', (req, res) => {
    res.redirect('/report/teacher-role/why-they-left')
  })

  router.post('/report/teacher-role/why-they-left', (req, res) => {
    res.redirect('/report/teacher-role/teaching-somewhere-else')
  })

  router.post('/report/teacher-role/teaching-somewhere-else', (req, res) => {
    if(req.session.data.report.teacherRole.teachingElsewhere == 'Yes') {
      res.redirect('/report/teacher-role/know-where-they-work')
    } else {
      res.redirect('/report/teacher-role/check-answers')
    }
  })

  router.post('/report/teacher-role/know-where-they-work', (req, res) => {
    if(req.session.data.report.teacherRole.knowWhereTheyWork === 'Yes') {
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
