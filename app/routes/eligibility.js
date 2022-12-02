const _ = require('lodash')

module.exports = router => {

  router.post('/email', (req, res) => { res.redirect('/email-code') })
  router.post('/email-code', (req, res) => { res.redirect('/who') })

  router.post('/who', (req, res) => {
    if(req.session.data.report['type-of-report'] == 'public') {
      res.redirect('/eligibility/public-other-options')
    } else {
      res.redirect('/eligibility/jurisdiction')
    }
  })

  router.post('/eligibility/public-other-options', (req, res) => {
    if(req.session.data.report.eligibility['made-complaint'] == 'Yes') {
      res.redirect('/eligibility/jurisdiction')
    } else {
      res.redirect('/eligibility/no-complaint')
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
      res.redirect('/eligibility/you-should-know')
    }
  })

  router.post('/eligibility/you-should-know', (req, res) => { res.redirect('/eligibility/save-as-you-go') })

  router.post('/eligibility/save-as-you-go', (req, res) => { res.redirect('/report') })

}
