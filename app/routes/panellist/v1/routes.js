// version
var v = '/panellist/v1/'
var vGet = 'panellist/v1/'
var avail = 'availability/'

module.exports = router => {

    router.post(v + 'respond', (req, res) => {
        if (req.session.data.response === 'yes'){
            req.session.data.jamesSmithResponded = true
            res.redirect(v + 'attending-confirmed')
        }
        if (req.session.data.response === 'no'){
            req.session.data.jamesSmithResponded = true
            res.redirect(v + 'not-attending-confirmed')
        }
    })

    router.post(v + avail + 'date', (req, res) => {
        req.session.data['unavailable-date'] = req.session.data['date-not-attending-year'] + "-" + req.session.data['date-not-attending-month'] + "-" + req.session.data['date-not-attending-day']
        if (req.session.data.repeatingOccurrence === 'yes'){
            res.redirect(v + avail + 'how-often')
        }
        if (req.session.data.repeatingOccurrence === 'no'){
            res.redirect(v + avail + 'check-answers')
        }
    })

    router.post(v + avail + 'how-often', (req, res) => {
        res.redirect(v + avail + 'check-answers')
    })

    router.post(v + avail + 'check-answers', (req, res) => {
        res.redirect(v + avail + 'added-confirmation')
    })



}
