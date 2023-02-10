const _ = require('lodash')
const referralHelper = require('../helpers/referral')

module.exports = router => {

  router.all(['/report', '/report/*'], (req, res, next) => {
    res.locals.isPublic = _.get(req.session.data, 'report[type-of-report]') == 'public'
    res.locals.isEmployer = !res.locals.isPublic
    next()
  })

  router.get('/account/sign-out', (req, res) => {
    delete req.session.data
    res.redirect('/')
  })

  router.get('/report', (req, res) => {
    if(typeof req.session.data.report.sentDate !== 'undefined') {

      let referrals = [req.session.data.report]

      res.render('report/list', {
        referrals
      })
    } else {
      res.render('report/index', {
        yourDetailsIncompleteSection: referralHelper.getFirstIncompleteQuestionFromYourDetails(req.session.data)
      })
    }
  })

  router.post('/report', (req, res) => {
    res.redirect('/report/submit/review')
  })

  router.get('/report/submit/review', (req, res) => {
    let yourDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourDetails(req.session.data)
    let yourOrganisationIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourOrganisation(req.session.data)
    let teacherDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherDetails(req.session.data)
    let teacherContactDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherContactDetails(req.session.data)

    let errorsList = []
    if(req.flash('error') == 'Errors detected') {
      if(yourDetailsIncompleteSection) {
        errorsList.push({
          href: '#app-your-details',
          text: 'You must complete your details before you can send your referral'
        })
      }
      if(yourOrganisationIncompleteSection) {
        errorsList.push({
          href: '#app-your-organisation',
          text: 'You must complete details about your organisation before you can send your referral'
        })
      }
      if(teacherDetailsIncompleteSection) {
        errorsList.push({
          href: '#app-teacher-details',
          text: 'You must complete personal details before you can send your referral'
        })
      }
      if(teacherContactDetailsIncompleteSection) {
        errorsList.push({
          href: '#app-teacher-contact-details',
          text: 'You must complete contact details before you can send your referral'
        })
      }
    }

    res.render('report/submit/review', {
      yourDetailsIncompleteSection,
      yourOrganisationIncompleteSection,
      teacherDetailsIncompleteSection,
      teacherContactDetailsIncompleteSection,
      errorsList
    })
  })

  router.post('/report/submit/review', (req, res) => {
    let yourDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourDetails(req.session.data)
    let yourOrganisationDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourOrganisation(req.session.data)
    let teacherDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherDetails(req.session.data)
    let teacherContactDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherContactDetails(req.session.data)
    if(yourDetailsIncompleteSection || yourOrganisationDetailsIncompleteSection || teacherDetailsIncompleteSection || teacherContactDetailsIncompleteSection) {
      req.flash('error', 'Errors detected')
      res.redirect('/report/submit/review')
    } else {
      req.session.data.report.sentDate = new Date().toISOString()
      res.redirect('/report/submit/confirmation')
    }
  })

}
