const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const flash = require('connect-flash')

router.use(flash())

router.all('*', (req, res, next) => {
  res.locals.flash = req.flash('success')
  next()
})

// require('./routes/nov-23/eligibility')(router)
// require('./routes/nov-23/report')(router)
// require('./routes/nov-23/report--your-details')(router)
// require('./routes/nov-23/report--your-organisation')(router)
// require('./routes/nov-23/report--teacher-details')(router)
// require('./routes/nov-23/report--teacher-contact-details')(router)
// require('./routes/nov-23/report--teacher-role')(router)
// require('./routes/nov-23/report--allegation')(router)
// require('./routes/nov-23/report--previous-misconduct')(router)
// require('./routes/nov-23/report--evidence')(router)

require('./routes/nov-23/routes')(router)
require('./routes/v1/routes')(router)
