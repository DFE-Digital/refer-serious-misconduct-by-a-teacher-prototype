const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const flash = require('connect-flash')

router.use(flash())

router.all('*', (req, res, next) => {
  res.locals.flash = req.flash('success')
  next()
})

router.get('/set-user-type', (req, res) => {
  req.session.data = {
    report: {
      email: 'jo@example.com',
      'type-of-report': req.query.type
    }
  }
  res.redirect('/report')
})

require('./routes/eligibility')(router)
require('./routes/report')(router)
require('./routes/report--your-details')(router)
require('./routes/report--your-organisation')(router)
require('./routes/report--teacher-details')(router)
require('./routes/report--teacher-contact-details')(router)
require('./routes/report--teacher-role')(router)
require('./routes/report--allegation')(router)
require('./routes/report--previous-misconduct')(router)
require('./routes/report--evidence')(router)
