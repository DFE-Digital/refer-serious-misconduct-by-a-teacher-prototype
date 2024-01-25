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

    router.get(v + avail + 'date', (req, res) => {
        req.session.data['error'] = null
        res.render(vGet + avail + 'date')
    })

    router.post(v + avail + 'date', (req, res) => {
        req.session.data['unavailable-date'] = req.session.data['date-not-attending-year'] + "-" + req.session.data['date-not-attending-month'] + "-" + req.session.data['date-not-attending-day']
        let dateObject = new Date(req.session.data['unavailable-date'])
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let today = new Date();

        req.session.data['dayOfWeek'] = days[dateObject.getDay()];

        function getOrdinalSuffix(day) {
            if (day > 3 && day < 21) return day + 'th'; // exceptions for 11th, 12th, 13th

            switch (day % 10) {
                case 1:  return day + 'st';
                case 2:  return day + 'nd';
                case 3:  return day + 'rd';
                default: return day + 'th';
            }
        }

        req.session.data.dateSuffix = getOrdinalSuffix(req.session.data['date-not-attending-day'])

        if (dateObject < today) {
            res.redirect(v + avail + 'date?error=date')
        }
        else if (req.session.data.repeatingOccurrence === 'yes'){
            req.session.data['error'] = null
            res.redirect(v + avail + 'how-often')
        }
        else if (req.session.data.repeatingOccurrence === 'no'){
            req.session.data['error'] = null
            res.redirect(v + avail + 'check-answers')
        }
        else {
            req.session.data['error'] = null
            res.redirect(v + avail + 'date')
        }
    })

    router.post(v + avail + 'how-often', (req, res) => {
        res.redirect(v + avail + 'check-answers')
    })

    router.post(v + avail + 'check-answers', (req, res) => {
        res.redirect(v + avail + 'added-confirmation')
    })



}
