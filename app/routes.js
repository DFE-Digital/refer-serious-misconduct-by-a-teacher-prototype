const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const flash = require('connect-flash')

router.use(flash())

router.all('*', (req, res, next) => {
  res.locals.flash = req.flash('success')
  next()
})

require('./routes/nov-23/routes')(router)
require('./routes/nov-23-live/routes')(router)
require('./routes/v1/routes')(router)
require('./routes/v2/routes')(router)
require('./routes/v3/routes')(router)
require('./routes/v4/routes')(router)

// panellist

require('./routes/panellist/v1/routes')(router)
