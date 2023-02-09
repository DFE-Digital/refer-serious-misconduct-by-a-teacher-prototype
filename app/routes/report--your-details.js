const _ = require('lodash')

function getFirstIncompleteSection(data) {
  let type = _.get(data, 'report.type-of-report')
  let firstName = _.get(data, 'report.your-details.firstName')
  let lastName = _.get(data, 'report.your-details.lastName')
  let jobTitle = _.get(data, 'report.your-details.job-title')
  let telephone = _.get(data, 'report.your-details.telephone')
  if(!firstName || !lastName) {
    return 'name'
  }
  console.log(data)
  if(type == 'employer' && !jobTitle) {
    return 'job-title'
  }
  if(!telephone) {
    return 'telephone'
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
    res.render('report/your-details/check-answers', {
      incompleteSection: getFirstIncompleteSection(req.session.data)
    })
  })

  router.post('/report/your-details/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
