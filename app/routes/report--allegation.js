const _ = require('lodash')

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

  router.post('/report/allegation/check-answers', (req, res) => {
    res.redirect('/report/')
  })

}
