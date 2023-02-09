const _ = require('lodash')

exports.getFirstIncompleteQuestionFromYourDetails = (data) => {
  let type = _.get(data, 'report.type-of-report')
  let firstName = _.get(data, 'report.your-details.firstName')
  let lastName = _.get(data, 'report.your-details.lastName')
  let jobTitle = _.get(data, 'report.your-details.job-title')
  let telephone = _.get(data, 'report.your-details.telephone')
  if(!firstName || !lastName) {
    return 'name'
  }
  if(type == 'employer' && !jobTitle) {
    return 'job-title'
  }
  if(!telephone) {
    return 'telephone'
  }
  return null
}

exports.getFirstIncompleteQuestionFromTeacherDetails = (data) => {
  let type = _.get(data, 'report.type-of-report')
  let firstName = _.get(data, 'report.teacherDetails.firstName')
  let lastName = _.get(data, 'report.teacherDetails.lastName')
  let hasPreviousName = _.get(data, 'report.teacherDetails.hasPreviousName')
  let previousName = _.get(data, 'report.teacherDetails.previousName')
  let knowDob = _.get(data, 'report.teacherDetails.knowDob')
  let dob = _.get(data, 'report.teacherDetails.dob')
  let knowNino = _.get(data, 'report.teacherDetails.knowNino')
  let nino = _.get(data, 'report.teacherDetails.nino')
  let knowTrn = _.get(data, 'report.teacherDetails.knowTrn')
  let trn = _.get(data, 'report.teacherDetails.trn')
  let qts = _.get(data, 'report.teacherDetails.qts')
  if(!firstName || !lastName || !hasPreviousName || (hasPreviousName == 'Yes' && !previousName)) {
    return 'name'
  }
  if(type == 'employer') {
    if(!knowDob || (knowDob && !dob)) {
      return 'dob'
    }
    if(!knowNino || (knowNino && !nino)) {
      return 'nino'
    }
    if(!knowTrn || (knowTrn && !trn)) {
      return 'trn'
    }
    if(!qts) {
      return 'qts'
    }
  }

  return null
}

exports.getFirstIncompleteQuestionFromYourOrganisation = (data) => {
  let type = _.get(data, 'report.type-of-report')
  let name = _.get(data, 'report.yourOrganisation.name')
  if(type == 'employer') {
    if(!name) {
      return 'organisation'
    }
  }

  return null
}