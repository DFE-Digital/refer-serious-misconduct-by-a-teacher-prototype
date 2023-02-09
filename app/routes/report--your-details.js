const _ = require('lodash')
const referralHelper = require('../helpers/referral')

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
      yourDetailsIncompleteSection: referralHelper.getFirstIncompleteQuestionFromYourDetails(req.session.data)
    })
  })

  router.post('/report/your-details/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
