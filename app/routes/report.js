const _ = require('lodash')

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
      res.render('report/index')
    }
  })

  router.post('/report', (req, res) => {
    res.redirect('/report/submit/review')
  })

  router.get('/report/submit/review', (req, res) => {
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
    res.render('report/submit/review', {
      fileRows
    })
  })

  router.post('/report/submit/review', (req, res) => {
    req.session.data.report.sentDate = new Date().toISOString()
    res.redirect('/report/submit/confirmation')
  })

}
