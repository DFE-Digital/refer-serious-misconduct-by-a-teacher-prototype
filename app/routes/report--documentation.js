const _ = require('lodash')

module.exports = router => {

  router.post('/report/documentation/anything-to-upload', (req, res) => {
    if(req.session.data.report.documentation['anything-to-upload'] == 'Yes') {
      res.redirect('/report/documentation/add')
    } else {
      res.redirect('/report/documentation/check-answers')
    }
  })

  router.post('/report/documentation/add', (req, res) => {
    const { isEmployer } = res.locals

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
    res.redirect('/report/documentation/uploaded')
  })

  router.post('/report/documentation/uploaded', (req, res) => {
    res.redirect('/report/documentation/type/001')
  })

  router.get('/report/documentation/type/:fileId', (req, res) => {
    let fileId = req.params.fileId
    let file = req.session.data.report.documentation['uploaded-files'][fileId]
    res.render('report/documentation/type', {
      fileId,
      file
    })
  })

  router.post('/report/documentation/type/:fileId', (req, res) => {
    let nextFileId = '00' + (parseInt(req.params.fileId, 10) + 1)
    let nextFile = req.session.data.report.documentation['uploaded-files'][nextFileId]

    if(nextFile) {
      res.redirect(`/report/documentation/type/${nextFileId}`)
    } else {
      res.redirect('/report/documentation/check-answers')
    }

  })

  router.get('/report/documentation/check-answers', (req, res) => {
    const files = _.get(req.session.data, 'report.documentation.uploaded-files') || {}
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
              href: `/report/documentation/edit-file/${fileId}`
            },
            {
              text: 'Delete',
              href: '#'
            }
          ]
        }
      })
    }
    res.render('report/documentation/check-answers', {
      fileRows
    })
  })

  router.post('/report/documentation/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
