// version
var v = '/panellist/v1/'
var vGet = 'panellist/v1/'

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

}
