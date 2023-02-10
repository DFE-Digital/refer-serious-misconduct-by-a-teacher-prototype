const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')
const referralHelper = require('../helpers/referral')

module.exports = router => {

  router.post('/report/evidence/has-evidence', (req, res) => {
    if(req.session.data.report.evidence.hasEvidence == 'Yes') {
      res.redirect('/report/evidence/upload')
    } else {
      res.redirect('/report/evidence/check-answers')
    }
  })

  router.post('/report/evidence/upload', (req, res) => {
    let employerFiles = [
      'main-investigation.pdf',
      'police-investigation.docx',
      'signed-witness-statements.pdf',
      'cctv-footage.mp4'
    ]

    let publicfiles = [
      'school-complaint.pdf',
      'emails-from-school.docx',
      'local-authority-email.pdf'
    ]

    if(!req.session.data.report.evidence.files) {
      req.session.data.report.evidence.files = {}
    }

    let filesCount = _.size(req.session.data.report.evidence.files)

    const { isEmployer } = res.locals
    if (isEmployer) {
      let nextFile = employerFiles[filesCount]

      if(nextFile) {
        req.session.data.report.evidence.files[uuidv4()] = {
          filename: nextFile
        }
      }

    } else {
      let nextFile = publicfiles[filesCount]

      if(nextFile) {
        req.session.data.report.evidence.files[uuidv4()] = {
          filename: nextFile
        }
      }
    }
    res.redirect('/report/evidence/check-files')
  })

  router.post('/report/evidence/check-files', (req, res) => {
    if(_.get(req, 'body.report.evidence.addMore') == 'Yes') {
      res.redirect(`/report/evidence/upload`)
    } else {
      res.redirect(`/report/evidence/check-answers`)
    }
  })

  router.get('/report/evidence/check-answers', (req, res) => {
    res.render('report/evidence/check-answers', {
      evidenceIncompleteSection: referralHelper.getFirstIncompleteQuestionFromEvidence(req.session.data)
    })
  })

  router.post('/report/evidence/check-answers', (req, res) => {
    res.redirect('/report')
  })

  router.get('/report/evidence/:fileId/delete', (req, res) => {
    let file = req.session.data.report.evidence.files[req.params.fileId]
    res.render('report/evidence/delete', {
      file
    })
  })

  router.post('/report/evidence/:fileId/delete', (req, res) => {
    delete req.session.data.report.evidence.files[req.params.fileId]
    let filesCount = _.size(req.session.data.report.evidence.files)

    req.flash('success', 'File deleted')

    if(filesCount > 0) {
      res.redirect('/report/evidence/check-files')
    } else {
      res.redirect('/report/evidence/has-evidence')
    }

  })

}
