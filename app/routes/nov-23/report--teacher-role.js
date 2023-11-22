const _ = require('lodash')
const referralHelper = require('../../helpers/referral')

var v = '/nov-23/'

module.exports = router => {

  router.post(v + 'report/teacher-role/job-title', (req, res) => {
    res.redirect(v + 'report/teacher-role/duties')
  })

  router.post(v + 'report/teacher-role/duties', (req, res) => {
    let isPublic = _.get(req.session.data, 'report[type-of-report]') == 'public';
    if(isPublic) {
      res.redirect(v + 'report/teacher-role/know-where-they-worked')
    } else {
      res.redirect(v + 'report/teacher-role/same-organisation')
    }
  })

  router.post(v + 'report/teacher-role/same-organisation', (req, res) => {
    if(req.session.data.report.teacherRole.sameOrganisation === 'Yes') {
      res.redirect(v + 'report/teacher-role/start-date')
    } else {
      res.redirect(v + 'report/teacher-role/know-where-they-worked')
    }
  })

  router.post(v + 'report/teacher-role/know-where-they-worked', (req, res) => {
    let isPublic = _.get(req.session.data, 'report[type-of-report]') == 'public';
    if(isPublic) {
      // public
      if(req.session.data.report.teacherRole.knowWhereTheyWorked === 'Yes') {
        res.redirect(v + 'report/teacher-role/where-they-worked')
      } else {
        res.redirect(v + 'report/teacher-role/check-answers')
      }
    } else {
      // employer
      if(req.session.data.report.teacherRole.knowWhereTheyWorked === 'Yes') {
        res.redirect(v + 'report/teacher-role/where-they-worked')
      } else {
        res.redirect(v + 'report/teacher-role/start-date')
      }
    }
  })

  router.post(v + 'report/teacher-role/where-they-worked', (req, res) => {
    let isPublic = _.get(req.session.data, 'report[type-of-report]') == 'public';
    if(isPublic) {
      // public
      res.redirect(v + 'report/teacher-role/check-answers')
    } else {
      // employer
      res.redirect(v + 'report/teacher-role/start-date')
    }
  })

  router.post(v + 'report/teacher-role/start-date', (req, res) => {
    res.redirect(v + 'report/teacher-role/still-employed')
  })

  router.post(v + 'report/teacher-role/still-employed', (req, res) => {
    if(req.session.data.report.teacherRole.stillEmployed === 'No') {
      res.redirect(v + 'report/teacher-role/end-date')
    } else {
      res.redirect(v + 'report/teacher-role/check-answers')
    }
  })

  router.post(v + 'report/teacher-role/end-date', (req, res) => {
    res.redirect(v + 'report/teacher-role/reason-for-leaving')
  })

  router.post(v + 'report/teacher-role/reason-for-leaving', (req, res) => {
    res.redirect(v + 'report/teacher-role/teaching-somewhere-else')
  })

  router.post(v + 'report/teacher-role/teaching-somewhere-else', (req, res) => {
    if(req.session.data.report.teacherRole.teachingElsewhere == 'Yes') {
      res.redirect(v + 'report/teacher-role/know-where-they-work')
    } else {
      res.redirect(v + 'report/teacher-role/check-answers')
    }
  })

  router.post(v + 'report/teacher-role/know-where-they-work', (req, res) => {
    if(req.session.data.report.teacherRole.knowWhereTheyWork === 'Yes') {
      res.redirect(v + 'report/teacher-role/where-they-work')
    } else {
      res.redirect(v + 'report/teacher-role/check-answers')
    }
  })

  router.post(v + 'report/teacher-role/where-they-work', (req, res) => {
    res.redirect(v + 'report/teacher-role/check-answers')
  })

  router.get(v + 'report/teacher-role/check-answers', (req, res) => {
    res.render('report/teacher-role/check-answers', {
      teacherRoleIncompleteSection: referralHelper.getFirstIncompleteQuestionFromTeacherRole(req.session.data)
    })
  })

  router.post(v + 'report/teacher-role/check-answers', (req, res) => {
    res.redirect(v + 'report')
  })

}
