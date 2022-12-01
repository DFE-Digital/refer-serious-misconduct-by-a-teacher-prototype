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

  router.post('/documentation/add', (req, res) => {
    const isEmployer = req.session.data.report['type-of-report'] != 'public'

    if (isEmployer) {
      req.session.data.report.documentation['uploaded-files'] = {
        '001': { filename: 'main-investigation.pdf' },
        '002': { filename: 'police-investigation.docx' },
        '003': { filename: 'signed-witness-statements.pdf' },
        '004': { filename: 'cctv-footage.mp4' }
      }
    } else {
      req.session.data.report.documentation['uploaded-files'] = {
        '001': { filename: 'school-complaint.pdf' },
        '002': { filename: 'emails-from-school.docx' },
        '003': { filename: 'local-authority-email.pdf' }
      }
    }

    redirect('somewhere')

  })

}
