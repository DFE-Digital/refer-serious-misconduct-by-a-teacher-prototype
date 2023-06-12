const _ = require('lodash')

module.exports = router => {
  router.post('/has-account', (req, res) => {
    let hasAccount = req.session.data.report.hasAccount

    if(hasAccount == 'Yes, sign in and continue making a referral') {
      res.redirect('/email')
    } else if(hasAccount == 'No') {
      res.redirect('/who')
    } else {
      res.redirect('/not-sure')
    }
  })

  router.post('/not-sure', (req, res) => {
    res.redirect('/not-sure-email-code')
  })

  router.post('/not-sure-email-code', (req, res) => {
    res.redirect('/status')
  })

  router.post('/email', (req, res) => {
    res.redirect('/email-code')
  })

  router.post('/email-code', (req, res) => {
    res.redirect('/report')
  })

  router.post('/who', (req, res) => {
    if(req.session.data.report['type-of-report'] == 'public') {
      res.redirect('/eligibility/public-other-options')
    } else {
      res.redirect('/eligibility/jurisdiction')
    }
  })

  router.post('/eligibility/public-other-options', (req, res) => {
    if(req.session.data.report.eligibility['made-complaint'] == 'Yes') {
      res.redirect('/eligibility/30-days')
    } else {
      res.redirect('/eligibility/no-complaint')
    }
  })

  router.post('/eligibility/30-days', (req, res) => {
    if(req.session.data.report.eligibility['30days'] == 'Yes') {
      res.redirect('/eligibility/within-30-days')
    } else {
      res.redirect('/eligibility/jurisdiction')
    }
  })

  router.post('/eligibility/jurisdiction', (req, res) => {
    if(req.session.data.report.eligibility['are-they-teacher'] == 'Yes') {
      res.redirect('/eligibility/england')
    } else {
      res.redirect('/eligibility/possible-jurisdiction')
    }
  })

  router.post('/eligibility/england', (req, res) => {
    if(req.session.data.report.eligibility['teacher-in-england'] == 'No') {
      res.redirect('/eligibility/no-jurisdiction-england')
    } else {
      res.redirect('/eligibility/serious')
    }
  })

  router.post('/eligibility/possible-jurisdiction', (req, res) => {
    if(req.session.data.report.eligibility['teacher-unsupervised'] == 'No') {
      res.redirect('/eligibility/no-jurisdiction-unsupervised')
    } else {
      res.redirect('/eligibility/england')
    }
  })

  router.post('/eligibility/serious', (req, res) => {
    if(req.session.data.report.eligibility.serious == 'No') {
      res.redirect('/eligibility/not-serious-misconduct')
    } else {
      res.redirect('/eligibility/implications')
      // res.redirect('/eligibility/you-should-know')
    }
  })

  router.post('/eligibility/implications', (req, res) => {
    if(req.session.data.report.eligibility.implications == 'No') {
      res.redirect('/eligibility/implications-no')
    } else {
      res.redirect('/eligibility/you-should-know')
    }
  })

  router.post('/eligibility/you-should-know', (req, res) => { res.redirect('/eligibility/save-as-you-go') })

  router.post('/eligibility/save-as-you-go', (req, res) => {
    res.redirect('/create-account-code')
  })

  router.post('/create-account-code', (req, res) => {
    res.redirect('/report')
  })

}
