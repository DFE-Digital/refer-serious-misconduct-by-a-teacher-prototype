const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')
const referralHelper = require('../../helpers/referral')

var v = '/nov-23/'

module.exports = router => {

  router.post(v + 'report/evidence/has-evidence', (req, res) => {
    if(req.session.data.report.evidence.hasEvidence == 'Yes') {
      res.redirect(v + 'report/evidence/upload')
    } else {
      res.redirect(v + 'report/evidence/check-answers')
    }
  })

  router.post(v + 'report/evidence/upload', (req, res) => {
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
    res.redirect(v + 'report/evidence/check-files')
  })

  router.post(v + 'report/evidence/check-files', (req, res) => {
    if(_.get(req, 'body.report.evidence.addMore') == 'Yes') {
      res.redirect(`/report/evidence/upload`)
    } else {
      res.redirect(`/report/evidence/check-answers`)
    }
  })

  router.get(v + 'report/evidence/check-answers', (req, res) => {
    res.render('report/evidence/check-answers', {
      evidenceIncompleteSection: referralHelper.getFirstIncompleteQuestionFromEvidence(req.session.data)
    })
  })

  router.post(v + 'report/evidence/check-answers', (req, res) => {
    res.redirect(v + 'report')
  })

  router.get(v + 'report/evidence/:fileId/delete', (req, res) => {
    let file = req.session.data.report.evidence.files[req.params.fileId]
    res.render('report/evidence/delete', {
      file
    })
  })

  router.post(v + 'report/evidence/:fileId/delete', (req, res) => {
    delete req.session.data.report.evidence.files[req.params.fileId]
    let filesCount = _.size(req.session.data.report.evidence.files)

    req.flash('success', 'File deleted')

    if(filesCount > 0) {
      res.redirect(v + 'report/evidence/check-files')
    } else {
      res.redirect(v + 'report/evidence/has-evidence')
    }

  })

}
