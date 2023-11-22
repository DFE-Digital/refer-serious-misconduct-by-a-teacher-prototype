const _ = require('lodash')
const referralHelper = require('../../helpers/referral')

var v = '/nov-23/'

module.exports = router => {

  router.all(['/report', '/report/*'], (req, res, next) => {
    res.locals.isPublic = _.get(req.session.data, 'report[type-of-report]') == 'public'
    res.locals.isEmployer = !res.locals.isPublic
    next()
  })

  router.get(v + 'account/sign-out', (req, res) => {
    delete req.session.data
    res.redirect(v + '')
  })

  router.get(v + 'report', (req, res) => {
    if(_.get(req.session.data, 'report.sentDate')) {

      let referrals = [req.session.data.report]

      res.render('report/list', {
        referrals
      })
    } else {

      let yourDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourDetails(req.session.data)
      let yourOrganisationIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourOrganisation(req.session.data)
      let teacherDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherDetails(req.session.data)
      let teacherContactDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherContactDetails(req.session.data)
      let teacherRoleIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherRole(req.session.data)
      let allegationIncompleteSection = referralHelper.getFirstIncompleteQuestionFromAllegation(req.session.data)
      let previousAllegationsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromPreviousAllegations(req.session.data)
      let evidenceIncompleteSection = referralHelper.getFirstIncompleteQuestionFromEvidence(req.session.data)

      res.render('report/index', {
        yourDetailsIncompleteSection,
        yourOrganisationIncompleteSection,
        teacherDetailsIncompleteSection,
        teacherContactDetailsIncompleteSection,
        teacherRoleIncompleteSection,
        allegationIncompleteSection,
        previousAllegationsIncompleteSection,
        evidenceIncompleteSection
      })
    }
  })

  router.post(v + 'report', (req, res) => {
    res.redirect(v + 'report/submit/review')
  })

  router.get(v + 'report/submit/review', (req, res) => {
    let yourDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourDetails(req.session.data)
    let yourOrganisationIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourOrganisation(req.session.data)
    let teacherDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherDetails(req.session.data)
    let teacherContactDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherContactDetails(req.session.data)
    let teacherRoleIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherRole(req.session.data)
    let allegationIncompleteSection = referralHelper.getFirstIncompleteQuestionFromAllegation(req.session.data)
    let previousAllegationsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromPreviousAllegations(req.session.data)
    let evidenceIncompleteSection = referralHelper.getFirstIncompleteQuestionFromEvidence(req.session.data)

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
      if(teacherRoleIncompleteSection) {
        errorsList.push({
          href: '#app-teacher-role',
          text: 'You must complete details about the role before you can send your referral'
        })
      }
      if(allegationIncompleteSection) {
        errorsList.push({
          href: '#app-allegation',
          text: 'You must complete allegation details before you can send your referral'
        })
      }
      if(previousAllegationsIncompleteSection) {
        errorsList.push({
          href: '#app-previous-allegations',
          text: 'You must complete previous allegation details before you can send your referral'
        })
      }
      if(evidenceIncompleteSection) {
        errorsList.push({
          href: '#app-evidence',
          text: 'You must complete evidence and supporting information before you can send your referral'
        })
      }
    }

    res.render('report/submit/review', {
      yourDetailsIncompleteSection,
      yourOrganisationIncompleteSection,
      teacherDetailsIncompleteSection,
      teacherContactDetailsIncompleteSection,
      teacherRoleIncompleteSection,
      allegationIncompleteSection,
      previousAllegationsIncompleteSection,
      evidenceIncompleteSection,
      errorsList
    })
  })

  router.post(v + 'report/submit/review', (req, res) => {
    let yourDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourDetails(req.session.data)
    let yourOrganisationDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourOrganisation(req.session.data)
    let teacherDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherDetails(req.session.data)
    let teacherContactDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherContactDetails(req.session.data)
    let teacherRoleIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherRole(req.session.data)
    let allegationIncompleteSection = referralHelper.getFirstIncompleteQuestionFromAllegation(req.session.data)
    let evidenceIncompleteSection = referralHelper.getFirstIncompleteQuestionFromEvidence(req.session.data)
    if(yourDetailsIncompleteSection || yourOrganisationDetailsIncompleteSection || teacherDetailsIncompleteSection || teacherContactDetailsIncompleteSection || teacherRoleIncompleteSection || allegationIncompleteSection || evidenceIncompleteSection) {
      req.flash('error', 'Errors detected')
      res.redirect(v + 'report/submit/review')
    } else {
      req.session.data.report.sentDate = new Date().toISOString()
      res.redirect(v + 'report/submit/confirmation')
    }
  })

}
