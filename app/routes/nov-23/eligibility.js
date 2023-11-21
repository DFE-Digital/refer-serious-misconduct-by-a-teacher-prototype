const _ = require('lodash')

// version
var v = '/nov-23/'

module.exports = router => {
  router.post(v + 'has-account', (req, res) => {
    let hasAccount = req.session.data.report.hasAccount

    if(hasAccount == 'Yes, sign in and continue making a referral') {
      res.redirect(v + 'email')
    } else if(hasAccount == 'No') {
      res.redirect(v + 'who')
    } else {
      res.redirect(v + 'not-sure')
    }
  })

  router.post(v + 'not-sure', (req, res) => {
    res.redirect(v + 'not-sure-email-code')
  })

  router.post(v + 'not-sure-email-code', (req, res) => {
    res.redirect(v + 'status')
  })

  router.post(v + 'email', (req, res) => {
    res.redirect(v + 'email-code')
  })

  router.post(v + 'email-code', (req, res) => {
    res.redirect(v + 'report')
  })

  router.post(v + 'who', (req, res) => {
    res.redirect(v + 'eligibility/jurisdiction')
  })

  router.post(v + 'eligibility/jurisdiction', (req, res) => {
    if(req.session.data.report.eligibility['are-they-teacher'] == 'Yes') {
      res.redirect(v + 'eligibility/england')
    } else {
      res.redirect(v + 'eligibility/possible-jurisdiction')
    }
  })

  router.post(v + 'eligibility/england', (req, res) => {
    if(req.session.data.report.eligibility['teacher-in-england'] == 'No') {
      res.redirect(v + 'eligibility/no-jurisdiction-england')
    } else {
      if(req.session.data.report['type-of-report'] == 'employer') {
        res.redirect(v + 'eligibility/serious')
      } else {
        res.redirect(v + 'eligibility/complain-or-refer')
      }

    }
  })

  router.post(v + 'eligibility/possible-jurisdiction', (req, res) => {
    if(req.session.data.report.eligibility['teacher-unsupervised'] == 'No') {
      res.redirect(v + 'eligibility/no-jurisdiction-unsupervised')
    } else {
      res.redirect(v + 'eligibility/england')
    }
  })

  router.post(v + 'eligibility/serious', (req, res) => {
    if(req.session.data.report.eligibility.serious == 'No') {
      res.redirect(v + 'eligibility/not-serious-misconduct')
    } else {
      res.redirect(v + 'eligibility/you-should-know')
    }
  })

  router.post(v + 'eligibility/complain-or-refer', (req, res) => {
    if(req.session.data.report.eligibility.proceed == 'Make a complaint') {
      res.redirect(v + 'eligibility/implications-no')
    } else {
      res.redirect(v + 'eligibility/you-should-know')
    }
  })

  router.post(v + 'eligibility/implications', (req, res) => {
    if(req.session.data.report.eligibility.implications == 'No') {
      res.redirect(v + 'eligibility/implications-no')
    } else {
      res.redirect(v + 'eligibility/you-should-know')
    }
  })

  router.post(v + 'eligibility/you-should-know', (req, res) => {
    res.redirect(v + 'eligibility/save-as-you-go')
  })

  router.post(v + 'eligibility/save-as-you-go', (req, res) => {
    res.redirect(v + 'create-account-code')
  })

  router.post(v + 'create-account-code', (req, res) => {
    res.redirect(v + 'report')
  })

}
