const _ = require('lodash')

module.exports = router => {

  router.post('/report/your-organisation/name', (req, res) => {
    res.redirect('/report/your-organisation/address')
  })

  router.post('/report/your-organisation/address', (req, res) => {
    res.redirect('/report/your-organisation/check-answers')
  })

  router.post('/report/your-organisation/check-answers', (req, res) => {
    res.redirect('/report')
  })

}
