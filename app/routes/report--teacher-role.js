const _ = require('lodash')
const referralHelper = require('../helpers/referral')

module.exports = router => {

  router.post('/report/teacher-role/job-title', (req, res) => {
    res.redirect('/report/teacher-role/duties')
  })

  router.post('/report/teacher-role/duties', (req, res) => {
    let isPublic = _.get(req.session.data, 'report[type-of-report]') == 'public';
    if(isPublic) {
      res.redirect('/report/teacher-role/know-where-they-worked')
    } else {
      res.redirect('/report/teacher-role/same-organisation')
    }
  })

  router.post('/report/teacher-role/same-organisation', (req, res) => {
    if(req.session.data.report.teacherRole.sameOrganisation === 'Yes') {
      res.redirect('/report/teacher-role/start-date')
    } else {
      res.redirect('/report/teacher-role/know-where-they-worked')
    }
  })

  router.post('/report/teacher-role/know-where-they-worked', (req, res) => {
    let isPublic = _.get(req.session.data, 'report[type-of-report]') == 'public';
    if(isPublic) {
      // public
      if(req.session.data.report.teacherRole.knowWhereTheyWorked === 'Yes') {
        res.redirect('/report/teacher-role/where-they-worked')
      } else {
        res.redirect('/report/teacher-role/check-answers')
      }
    } else {
      // employer
      if(req.session.data.report.teacherRole.knowWhereTheyWorked === 'Yes') {
        res.redirect('/report/teacher-role/where-they-worked')
      } else {
        res.redirect('/report/teacher-role/start-date')
      }
    }
  })

  router.post('/report/teacher-role/where-they-worked', (req, res) => {
    let isPublic = _.get(req.session.data, 'report[type-of-report]') == 'public';
    if(isPublic) {
      // public
      res.redirect('/report/teacher-role/check-answers')
    } else {
      // employer
      res.redirect('/report/teacher-role/start-date')
    }
  })

  router.post('/report/teacher-role/start-date', (req, res) => {
    res.redirect('/report/teacher-role/still-employed')
  })

  router.post('/report/teacher-role/still-employed', (req, res) => {
    if(req.session.data.report.teacherRole.stillEmployed === 'No') {
      res.redirect('/report/teacher-role/end-date')
    } else {
      res.redirect('/report/teacher-role/check-answers')
    }
  })

  router.post('/report/teacher-role/end-date', (req, res) => {
    res.redirect('/report/teacher-role/reason-for-leaving')
  })

  router.post('/report/teacher-role/reason-for-leaving', (req, res) => {
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

  router.get('/report/teacher-role/check-answers', (req, res) => {
    res.render('report/teacher-role/check-answers', {
      teacherRoleIncompleteSection: referralHelper.getFirstIncompleteQuestionFromTeacherRole(req.session.data)
    })
  })

  router.post('/report/teacher-role/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
