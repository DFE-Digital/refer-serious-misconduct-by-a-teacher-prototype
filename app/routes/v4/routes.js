const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')
const referralHelper = require('../../helpers/referral')

// version
var v = '/v4/'
var vGet = 'v4/'

module.exports = router => {

    // Set user type

    router.get(v + 'set-user-type', (req, res) => {
        req.session.data = {
            report: {
                email: 'jo@example.com',
                'type-of-report': req.query.type
            }
        }

        if(req.query.sent) {
            req.session.data.report.sentDate = new Date().toISOString()
        }

        res.redirect('report')
    })

    // Eligibility

    router.post(v + 'has-account', (req, res) => {
        let hasAccount = req.session.data['hasAccount']

        if(hasAccount == 'Yes, sign in and continue making a referral') {
            res.redirect(v + 'email')
        } else if(hasAccount == 'No') {
            res.redirect(v + 'who')
        } else {
            res.redirect(v + 'not-sure')
        }
    })

    router.post(v + 'email', (req, res) => {
        res.redirect(v + 'email-code')
    })

    router.post(v + 'email-code', (req, res) => {
        res.redirect(v + 'report')
    })

    router.post(v + 'who', (req, res) => {
        if(req.session.data['type-of-report'] === 'public') {
            res.redirect(v + 'eligibility/complaint')
        } else {
            res.redirect(v + 'eligibility/jurisdiction')
        }
    })

    router.post(v + 'eligibility/complaint', (req, res) => {
        if (req.session.data['have-you-complained'] === "Yes, and I received an outcome") {
            res.redirect(v + 'eligibility/allegation')
        }
        else if (req.session.data['have-you-complained'] === "Yes, and I'm waiting for an outcome") {
            res.redirect(v + 'eligibility/awaiting-outcome')
        }
        else {
            res.redirect(v + 'eligibility/not-complained')
        }
    })

    router.post(v + 'eligibility/jurisdiction', (req, res) => {
        if(req.session.data['are-they-teacher'] === 'Yes') {
            res.redirect(v + 'eligibility/england')
        }
        else if(req.session.data['are-they-teacher'] === 'No') {
            res.redirect(v + 'eligibility/no-jurisdiction-unsupervised')
        }
        else {
            res.redirect(v + 'eligibility/possible-jurisdiction')
        }
    })


    router.post(v + 'eligibility/you-should-know-public', (req, res) => {
        res.redirect(v + 'eligibility/save-as-you-go')
    })

    router.post(v + 'eligibility/allegation', (req, res) => {
        if (req.session.data['allegation'] == "none") {
            res.redirect(v + 'eligibility/pause')
        }
        else {
            res.redirect(v + 'eligibility/jurisdiction')
        }
    })

    router.post(v + 'eligibility/england', (req, res) => {
        if(req.session.data['teacher-in-england'] === 'No') {
            res.redirect(v + 'eligibility/no-jurisdiction-england')
        } else {
            if(req.session.data['type-of-report'] === 'employer') {
                res.redirect(v + 'eligibility/serious')
            } else {
                res.redirect(v + 'eligibility/you-should-know-public')
            }

        }
    })

    router.post(v + 'eligibility/possible-jurisdiction', (req, res) => {
        if(req.session.data['teacher-unsupervised'] === 'No') {
            res.redirect(v + 'eligibility/no-jurisdiction-unsupervised')
        } else {
            res.redirect(v + 'eligibility/england')
        }
    })

    router.post(v + 'eligibility/serious', (req, res) => {
        if(req.session.data['serious'] === 'No') {
            res.redirect(v + 'eligibility/not-serious-misconduct')
        } else {
            res.redirect(v + 'eligibility/you-should-know')
        }
    })

    router.post(v + 'eligibility/you-should-know', (req, res) => {
        res.redirect(v + 'eligibility/save-as-you-go')
    })

    router.post(v + 'eligibility/save-as-you-go', (req, res) => {
        res.redirect(v + 'create-account-code')
    })

    router.post(v + 'create-account-code', (req, res) => {
        res.redirect(v + 'report')
    })

    // Report

    router.all([v + 'report', v + 'report/*'], (req, res, next) => {
        res.locals.isPublic = _.get(req.session.data, '[type-of-report]') == 'public'
        res.locals.isEmployer = !res.locals.isPublic
        next()
    })

    router.get(v + 'account/sign-out', (req, res) => {
        delete req.session.data
        res.redirect(v + '')
    })

    router.get(v + 'report', (req, res) => {
        if(_.get(req.session.data, 'report.sentDate')) {

            let referrals = [req.session.data.report]

            res.render(vGet + 'report/list', {
                referrals
            })
        } else {

            let yourDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourDetails(req.session.data)
            let yourOrganisationIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourOrganisation(req.session.data)
            let teacherDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherDetails(req.session.data)
            let teacherContactDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherContactDetails(req.session.data)
            let teacherRoleIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherRole(req.session.data)
            let allegationIncompleteSection = referralHelper.getFirstIncompleteQuestionFromAllegation(req.session.data)
            let previousAllegationsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromPreviousAllegations(req.session.data)
            let evidenceIncompleteSection = referralHelper.getFirstIncompleteQuestionFromEvidence(req.session.data)

            res.render(vGet + 'report/index', {
                yourDetailsIncompleteSection,
                yourOrganisationIncompleteSection,
                teacherDetailsIncompleteSection,
                teacherContactDetailsIncompleteSection,
                teacherRoleIncompleteSection,
                allegationIncompleteSection,
                previousAllegationsIncompleteSection,
                evidenceIncompleteSection
            })
        }
    })

    router.post(v + 'report', (req, res) => {
        res.redirect(v + 'report/submit/review')
    })

    router.get(v + 'report/submit/review', (req, res) => {
        let yourDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourDetails(req.session.data)
        let yourOrganisationIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourOrganisation(req.session.data)
        let teacherDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherDetails(req.session.data)
        let teacherContactDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherContactDetails(req.session.data)
        let teacherRoleIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherRole(req.session.data)
        let allegationIncompleteSection = referralHelper.getFirstIncompleteQuestionFromAllegation(req.session.data)
        let previousAllegationsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromPreviousAllegations(req.session.data)
        let evidenceIncompleteSection = referralHelper.getFirstIncompleteQuestionFromEvidence(req.session.data)

        let errorsList = []
        if(req.flash('error') == 'Errors detected') {
            if(yourDetailsIncompleteSection) {
                errorsList.push({
                    href: '#app-your-details',
                    text: 'You must complete your details before you can send your referral'
                })
            }
            if(yourOrganisationIncompleteSection) {
                errorsList.push({
                    href: '#app-your-organisation',
                    text: 'You must complete details about your organisation before you can send your referral'
                })
            }
            if(teacherDetailsIncompleteSection) {
                errorsList.push({
                    href: '#app-teacher-details',
                    text: 'You must complete personal details before you can send your referral'
                })
            }
            if(teacherContactDetailsIncompleteSection) {
                errorsList.push({
                    href: '#app-teacher-contact-details',
                    text: 'You must complete contact details before you can send your referral'
                })
            }
            if(teacherRoleIncompleteSection) {
                errorsList.push({
                    href: '#app-teacher-role',
                    text: 'You must complete details about the role before you can send your referral'
                })
            }
            if(allegationIncompleteSection) {
                errorsList.push({
                    href: '#app-allegation',
                    text: 'You must complete allegation details before you can send your referral'
                })
            }
            if(previousAllegationsIncompleteSection) {
                errorsList.push({
                    href: '#app-previous-allegations',
                    text: 'You must complete previous allegation details before you can send your referral'
                })
            }
            if(evidenceIncompleteSection) {
                errorsList.push({
                    href: '#app-evidence',
                    text: 'You must complete evidence and supporting information before you can send your referral'
                })
            }
        }

        res.render(vGet + 'report/submit/review', {
            yourDetailsIncompleteSection,
            yourOrganisationIncompleteSection,
            teacherDetailsIncompleteSection,
            teacherContactDetailsIncompleteSection,
            teacherRoleIncompleteSection,
            allegationIncompleteSection,
            previousAllegationsIncompleteSection,
            evidenceIncompleteSection,
            errorsList
        })
    })

    router.post(v + 'report/submit/review', (req, res) => {
        let yourDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourDetails(req.session.data)
        let yourOrganisationDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromYourOrganisation(req.session.data)
        let teacherDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherDetails(req.session.data)
        let teacherContactDetailsIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherContactDetails(req.session.data)
        let teacherRoleIncompleteSection = referralHelper.getFirstIncompleteQuestionFromTeacherRole(req.session.data)
        let allegationIncompleteSection = referralHelper.getFirstIncompleteQuestionFromAllegation(req.session.data)
        let evidenceIncompleteSection = referralHelper.getFirstIncompleteQuestionFromEvidence(req.session.data)
        if(yourDetailsIncompleteSection || yourOrganisationDetailsIncompleteSection || teacherDetailsIncompleteSection || teacherContactDetailsIncompleteSection || teacherRoleIncompleteSection || allegationIncompleteSection || evidenceIncompleteSection) {
            req.flash('error', 'Errors detected')
            res.redirect(v + 'report/submit/review')
        } else {
            req.session.data.report.sentDate = new Date().toISOString()
            res.redirect(v + 'report/submit/confirmation')
        }
    })

    // Report allegation

    router.post(v + 'report/allegation/allegation', (req, res) => {
        if(res.locals.isPublic) {
            res.redirect(v + 'report/allegation/already-considered')
        } else {
            res.redirect(v + 'report/allegation/dbs')
        }
    })

    router.post(v + 'report/allegation/already-considered', (req, res) => {
        res.redirect(v + 'report/allegation/check-answers')
    })

    router.post(v + 'report/allegation/dbs', (req, res) => {
        res.redirect(v + 'report/allegation/check-answers')
    })

    router.get(v + 'report/allegation/check-answers', (req, res) => {
        res.render(vGet + 'report/allegation/check-answers', {
            allegationIncompleteSection: referralHelper.getFirstIncompleteQuestionFromAllegation(req.session.data)
        })
    })

    router.post(v + 'report/allegation/check-answers', (req, res) => {
        res.redirect(v + 'report')
    })

    // Report evidence

    router.post(v + 'report/evidence/has-evidence', (req, res) => {
        if(req.session.data.report.evidence.hasEvidence == 'Yes') {
            res.redirect(v + 'report/evidence/upload')
        } else {
            res.redirect(v + 'report/evidence/check-answers')
        }
    })

    router.post(v + 'report/evidence/upload', (req, res) => {
        let employerFiles = [
            'main-investigation.pdf',
            'police-investigation.docx',
            'signed-witness-statements.pdf',
            'cctv-footage.mp4'
        ]

        let publicfiles = [
            'school-complaint.pdf',
            'emails-from-school.docx',
            'local-authority-email.pdf'
        ]

        if(!req.session.data.report.evidence.files) {
            req.session.data.report.evidence.files = {}
        }

        let filesCount = _.size(req.session.data.report.evidence.files)

        const { isEmployer } = res.locals
        if (isEmployer) {
            let nextFile = employerFiles[filesCount]

            if(nextFile) {
                req.session.data.report.evidence.files[uuidv4()] = {
                    filename: nextFile
                }
            }

        } else {
            let nextFile = publicfiles[filesCount]

            if(nextFile) {
                req.session.data.report.evidence.files[uuidv4()] = {
                    filename: nextFile
                }
            }
        }
        res.redirect(v + 'report/evidence/check-files')
    })

    router.post(v + 'report/evidence/check-files', (req, res) => {
        if(_.get(req, 'body.report.evidence.addMore') == 'Yes') {
            res.redirect(v + `report/evidence/upload`)
        } else {
            res.redirect(v + `report/evidence/check-answers`)
        }
    })

    router.get(v + 'report/evidence/check-answers', (req, res) => {
        res.render(vGet + 'report/evidence/check-answers', {
            evidenceIncompleteSection: referralHelper.getFirstIncompleteQuestionFromEvidence(req.session.data)
        })
    })

    router.post(v + 'report/evidence/check-answers', (req, res) => {
        res.redirect(v + 'report')
    })

    router.get(v + 'report/evidence/:fileId/delete', (req, res) => {
        let file = req.session.data.report.evidence.files[req.params.fileId]
        res.render(vGet + 'report/evidence/delete', {
            file
        })
    })

    router.post(v + 'report/evidence/:fileId/delete', (req, res) => {
        delete req.session.data.report.evidence.files[req.params.fileId]
        let filesCount = _.size(req.session.data.report.evidence.files)

        req.flash('success', 'File deleted')

        if(filesCount > 0) {
            res.redirect(v + 'report/evidence/check-files')
        } else {
            res.redirect(v + 'report/evidence/has-evidence')
        }

    })

    // Report previous misconduct

    router.post(v + 'report/previous-misconduct/any-previous', (req, res) => {
        if(req.session.data.report.previousMisconduct.anyPrevious == 'Yes') {
            res.redirect(v + 'report/previous-misconduct/previous-misconduct')
        } else {
            res.redirect(v + 'report/previous-misconduct/check-answers')
        }
    })

    router.post(v + 'report/previous-misconduct/previous-misconduct', (req, res) => {
        res.redirect(v + 'report/previous-misconduct/check-answers')
    })

    router.get(v + 'report/previous-misconduct/check-answers', (req, res) => {
        res.render(vGet + 'report/previous-misconduct/check-answers', {
            previousAllegationsIncompleteSection: referralHelper.getFirstIncompleteQuestionFromPreviousAllegations(req.session.data)
        })
    })

    router.post(v + 'report/previous-misconduct/check-answers', (req, res) => {
        res.redirect(v + 'report')
    })

    // Report teacher contact details

    router.post(v + 'report/teacher-contact-details/email', (req, res) => {
        res.redirect(v + 'report/teacher-contact-details/telephone')
    })

    router.post(v + 'report/teacher-contact-details/telephone', (req, res) => {
        res.redirect(v + 'report/teacher-contact-details/know-address')
    })

    router.post(v + 'report/teacher-contact-details/know-address', (req, res) => {
        if(req.session.data.report.teacherContactDetails.knowHomeAddress == 'Yes') {
            res.redirect(v + 'report/teacher-contact-details/address')
        } else {
            res.redirect(v + 'report/teacher-contact-details/check-answers')
        }
    })

    router.post(v + 'report/teacher-contact-details/address', (req, res) => {
        res.redirect(v + 'report/teacher-contact-details/check-answers')
    })

    router.get(v + 'report/teacher-contact-details/check-answers', (req, res) => {
        res.render(vGet + 'report/teacher-contact-details/check-answers', {
            teacherContactDetailsIncompleteSection: referralHelper.getFirstIncompleteQuestionFromTeacherContactDetails(req.session.data)
        })
    })

    router.post(v + 'report/teacher-contact-details/check-answers', (req, res) => {
        res.redirect(v + 'report')
    })

    // Report teacher details

    router.post(v + 'report/teacher/name', (req, res) => {
        if(res.locals.isPublic) {
            res.redirect(v + 'report/teacher/check-answers')
        } else {
            res.redirect(v + 'report/teacher/dob')
        }
    })

    router.post(v + 'report/teacher/dob', (req, res) => {
        res.redirect(v + 'report/teacher/nino')
    })

    router.post(v + 'report/teacher/nino', (req, res) => {
        res.redirect(v + 'report/teacher/trn')
    })

    router.post(v + 'report/teacher/trn', (req, res) => {
        res.redirect(v + 'report/teacher/qts')
    })

    router.post(v + 'report/teacher/qts', (req, res) => {
        res.redirect(v + 'report/teacher/check-answers')
    })

    router.get(v + 'report/teacher/check-answers', (req, res) => {
        res.render(vGet + 'report/teacher/check-answers', {
            teacherDetailsIncompleteSection: referralHelper.getFirstIncompleteQuestionFromTeacherDetails(req.session.data)
        })
    })

    router.post(v + 'report/teacher/check-answers', (req, res) => {
        res.redirect(v + 'report')
    })

    // Report teacher role

    router.post(v + 'report/teacher-role/job-title', (req, res) => {
        res.redirect(v + 'report/teacher-role/duties')
    })

    router.post(v + 'report/teacher-role/duties', (req, res) => {
        let isPublic = _.get(req.session.data, '[type-of-report]') == 'public';
        if(isPublic) {
            res.redirect(v + 'report/teacher-role/know-where-they-worked')
        } else {
            res.redirect(v + 'report/teacher-role/same-organisation')
        }
    })

    router.post(v + 'report/teacher-role/same-organisation', (req, res) => {
        if(req.session.data.report.teacherRole.sameOrganisation === 'Yes') {
            res.redirect(v + 'report/teacher-role/start-date')
        } else {
            res.redirect(v + 'report/teacher-role/know-where-they-worked')
        }
    })

    router.post(v + 'report/teacher-role/know-where-they-worked', (req, res) => {
        let isPublic = _.get(req.session.data, '[type-of-report]') == 'public';
        if(isPublic) {
            // public
            if(req.session.data.report.teacherRole.knowWhereTheyWorked === 'Yes') {
                res.redirect(v + 'report/teacher-role/where-they-worked')
            } else {
                res.redirect(v + 'report/teacher-role/check-answers')
            }
        } else {
            // employer
            if(req.session.data.report.teacherRole.knowWhereTheyWorked === 'Yes') {
                res.redirect(v + 'report/teacher-role/where-they-worked')
            } else {
                res.redirect(v + 'report/teacher-role/start-date')
            }
        }
    })

    router.post(v + 'report/teacher-role/where-they-worked', (req, res) => {
        let isPublic = _.get(req.session.data, '[type-of-report]') == 'public';
        if(isPublic) {
            // public
            res.redirect(v + 'report/teacher-role/check-answers')
        } else {
            // employer
            res.redirect(v + 'report/teacher-role/start-date')
        }
    })

    router.post(v + 'report/teacher-role/start-date', (req, res) => {
        res.redirect(v + 'report/teacher-role/still-employed')
    })

    router.post(v + 'report/teacher-role/still-employed', (req, res) => {
        if(req.session.data.report.teacherRole.stillEmployed === 'No') {
            res.redirect(v + 'report/teacher-role/end-date')
        } else {
            res.redirect(v + 'report/teacher-role/check-answers')
        }
    })

    router.post(v + 'report/teacher-role/end-date', (req, res) => {
        res.redirect(v + 'report/teacher-role/reason-for-leaving')
    })

    router.post(v + 'report/teacher-role/reason-for-leaving', (req, res) => {
        res.redirect(v + 'report/teacher-role/teaching-somewhere-else')
    })

    router.post(v + 'report/teacher-role/teaching-somewhere-else', (req, res) => {
        if(req.session.data.report.teacherRole.teachingElsewhere == 'Yes') {
            res.redirect(v + 'report/teacher-role/know-where-they-work')
        } else {
            res.redirect(v + 'report/teacher-role/check-answers')
        }
    })

    router.post(v + 'report/teacher-role/know-where-they-work', (req, res) => {
        if(req.session.data.report.teacherRole.knowWhereTheyWork === 'Yes') {
            res.redirect(v + 'report/teacher-role/where-they-work')
        } else {
            res.redirect(v + 'report/teacher-role/check-answers')
        }
    })

    router.post(v + 'report/teacher-role/where-they-work', (req, res) => {
        res.redirect(v + 'report/teacher-role/check-answers')
    })

    router.get(v + 'report/teacher-role/check-answers', (req, res) => {
        res.render(vGet + 'report/teacher-role/check-answers', {
            teacherRoleIncompleteSection: referralHelper.getFirstIncompleteQuestionFromTeacherRole(req.session.data)
        })
    })

    router.post(v + 'report/teacher-role/check-answers', (req, res) => {
        res.redirect(v + 'report')
    })

    // Report your details

    router.post(v + 'report/your-details/name', (req, res) => {
        if(res.locals.isPublic) {
            res.redirect(v + 'report/your-details/telephone')
        } else {
            res.redirect(v + 'report/your-details/job-title')
        }
    })

    router.post(v + 'report/your-details/job-title', (req, res) => {
        res.redirect(v + 'report/your-details/telephone')
    })

    router.post(v + 'report/your-details/telephone', (req, res) => {
        res.redirect(v + 'report/your-details/check-answers')
    })

    router.get(v + 'report/your-details/check-answers', (req, res) => {
        res.render(vGet + 'report/your-details/check-answers', {
            yourDetailsIncompleteSection: referralHelper.getFirstIncompleteQuestionFromYourDetails(req.session.data)
        })
    })

    router.post(v + 'report/your-details/check-answers', (req, res) => {
        res.redirect(v + 'report')
    })

    // Report your organisation

    router.post(v + 'report/your-organisation/organisation', (req, res) => {
        res.redirect(v + 'report/your-organisation/check-answers')
    })

    router.get(v + 'report/your-organisation/check-answers', (req, res) => {
        res.render(vGet + 'report/your-organisation/check-answers', {
            yourOrganisationIncompleteSection: referralHelper.getFirstIncompleteQuestionFromYourOrganisation(req.session.data)
        })
    })

    router.post(v + 'report/your-organisation/check-answers', (req, res) => {
        res.redirect(v + 'report')
    })

}
