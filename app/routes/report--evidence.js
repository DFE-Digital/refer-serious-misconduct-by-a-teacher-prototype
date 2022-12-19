const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')

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
    if(req.session.data.report.evidence.addMore == 'Yes') {
      res.redirect(`/report/evidence/upload`)
    } else {
      res.redirect(`/report/evidence/check-answers`)
    }
  })

  router.get('/report/evidence/check-answers', (req, res) => {
    const files = _.get(req.session.data, 'report.evidence.evidence.uploaded-files') || {}
    const fileRows = []

    for (const [fileId, file] of Object.entries(files)) {
      let fileTypes = file.type ? file.type.join(', ') : 'No type'
      fileTypes = 'Type:<br />' + fileTypes.replace('Other', `Other: ${file['other-type']}`)

      fileRows.push({
        key: {
          html: `<a href="#">${file.filename}</a>`
        },
        value: {
          html: fileTypes
        },
        actions: {
          items: [
            {
              text: 'Change',
              href: `/report/evidence/edit-file/${fileId}`
            },
            {
              text: 'Delete',
              href: '#'
            }
          ]
        }
      })
    }
    res.render('report/evidence/check-answers', {
      fileRows
    })
  })

  router.post('/report/evidence/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
