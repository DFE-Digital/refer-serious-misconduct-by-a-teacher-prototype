const _ = require('lodash')
const referralHelper = require('../helpers/referral')

module.exports = router => {

  router.post('/report/your-organisation/organisation', (req, res) => {
    res.redirect('/report/your-organisation/check-answers')
  })

  router.get('/report/your-organisation/check-answers', (req, res) => {
    res.render('report/your-organisation/check-answers', {
      yourOrganisationIncompleteSection: referralHelper.getFirstIncompleteQuestionFromYourOrganisation(req.session.data)
    })
  })

  router.post('/report/your-organisation/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
