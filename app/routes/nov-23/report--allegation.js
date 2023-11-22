const _ = require('lodash')
const referralHelper = require('../../helpers/referral')

var v = '/nov-23/'

module.exports = router => {

  router.post('/report/allegation/allegation', (req, res) => {
    if(res.locals.isPublic) {
      res.redirect('/report/allegation/already-considered')
    } else {
      res.redirect('/report/allegation/dbs')
    }
  })

  router.post('/report/allegation/already-considered', (req, res) => {
    res.redirect('/report/allegation/check-answers')
  })

  router.post('/report/allegation/dbs', (req, res) => {
    res.redirect('/report/allegation/check-answers')
  })

  router.get('/report/allegation/check-answers', (req, res) => {
    res.render('report/allegation/check-answers', {
      allegationIncompleteSection: referralHelper.getFirstIncompleteQuestionFromAllegation(req.session.data)
    })
  })

  router.post('/report/allegation/check-answers', (req, res) => {
    res.redirect('/report/')
  })

}
