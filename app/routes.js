const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const flash = require('connect-flash')

router.use(flash())

router.all('*', (req, res, next) => {
  res.locals.flash = req.flash('success')
  next()
})

require('./routes/eligibility')(router)
require('./routes/report')(router)
require('./routes/report--your-details')(router)
require('./routes/report--your-organisation')(router)
require('./routes/report--teacher-details')(router)
require('./routes/report--teacher-contact-details')(router)
require('./routes/report--previous-misconduct')(router)
require('./routes/report--documentation')(router)