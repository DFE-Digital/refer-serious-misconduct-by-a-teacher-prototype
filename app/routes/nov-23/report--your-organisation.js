const _ = require('lodash')
const referralHelper = require('../../helpers/referral')

var v = '/nov-23/'

module.exports = router => {

  router.post(v + 'report/your-organisation/organisation', (req, res) => {
    res.redirect(v + 'report/your-organisation/check-answers')
  })

  router.get(v + 'report/your-organisation/check-answers', (req, res) => {
    res.render('report/your-organisation/check-answers', {
      yourOrganisationIncompleteSection: referralHelper.getFirstIncompleteQuestionFromYourOrganisation(req.session.data)
    })
  })

  router.post(v + 'report/your-organisation/check-answers', (req, res) => {
    res.redirect(v + 'report')
  })

}
