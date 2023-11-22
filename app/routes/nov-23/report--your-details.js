const _ = require('lodash')
const referralHelper = require('../../helpers/referral')

var v = '/nov-23/'

module.exports = router => {

  router.post(v + 'report/your-details/name', (req, res) => {
    if(res.locals.isPublic) {
      res.redirect(v + 'report/your-details/telephone')
    } else {
      res.redirect(v + 'report/your-details/job-title')
    }
  })

  router.post(v + 'report/your-details/job-title', (req, res) => {
    res.redirect(v + 'report/your-details/telephone')
  })

  router.post(v + 'report/your-details/telephone', (req, res) => {
    res.redirect(v + 'report/your-details/check-answers')
  })

  router.get(v + 'report/your-details/check-answers', (req, res) => {
    res.render('report/your-details/check-answers', {
      yourDetailsIncompleteSection: referralHelper.getFirstIncompleteQuestionFromYourDetails(req.session.data)
    })
  })

  router.post(v + 'report/your-details/check-answers', (req, res) => {
    res.redirect(v + 'report')
  })

}
