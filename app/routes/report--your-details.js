const _ = require('lodash')

function getFirstIncompleteSection(data) {
  let firstName = _.get(data, 'report.your-details.firstName')
  let lastName = _.get(data, 'report.your-details.lastName')
  if(!firstName or !lastName) {
    return {
      name: 'name'
    }
  }
}

module.exports = router => {

  router.post('/report/your-details/name', (req, res) => {
    if(res.locals.isPublic) {
      res.redirect('/report/your-details/telephone')
    } else {
      res.redirect('/report/your-details/job-title')
    }
  })

  router.post('/report/your-details/job-title', (req, res) => {
    res.redirect('/report/your-details/telephone')
  })

  router.post('/report/your-details/telephone', (req, res) => {
    res.redirect('/report/your-details/check-answers')
  })

  router.get('/report/your-details/check-answers', (req, res) => {
    getFirstIncompleteSection(req.session.data)
    res.render('report/your-details/check-answers')
  })

  router.post('/report/your-details/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
