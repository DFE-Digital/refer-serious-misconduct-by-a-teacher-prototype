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

exports.getFirstIncompleteQuestionFromTeacherContactDetails = (data) => {
  let knowEmailAddress = _.get(data, 'report.teacherContactDetails.knowEmailAddress')
  let emailAddress = _.get(data, 'report.teacherContactDetails.emailAddress')
  let knowTelephone = _.get(data, 'report.teacherContactDetails.knowTelephone')
  let telephone = _.get(data, 'report.teacherContactDetails.telephone')
  let knowHomeAddress = _.get(data, 'report.teacherContactDetails.knowHomeAddress')
  let addressLine1 = _.get(data, 'report.teacherContactDetails.address.line1')

  if(!knowEmailAddress || (knowEmailAddress && !emailAddress)) {
    return 'email'
  }
  if(!knowTelephone || (knowTelephone && !telephone)) {
    return 'telephone'
  }
  if(!knowHomeAddress) {
    return 'know-address'
  }
  if(knowHomeAddress && !addressLine1) {
    return 'address'
  }

  return null
}

exports.getFirstIncompleteQuestionFromTeacherRole = (data) => {
  let type = _.get(data, 'report.type-of-report')
  let jobTitle = _.get(data, 'report.teacherRole.jobTitle')
  let duties = _.get(data, 'report.teacherRole.duties')
  let sameOrganisation = _.get(data, 'report.teacherRole.sameOrganisation')
  let knowWhereTheyWorked = _.get(data, 'report.teacherRole.knowWhereTheyWorked')
  let organisationName = _.get(data, 'report.teacherRole.organisation.name')
  let knowJobStartDate = _.get(data, 'report.teacherRole.knowJobStartDate')
  let stillEmployed = _.get(data, 'report.teacherRole.stillEmployed')
  let knowWhenTheyLeft = _.get(data, 'report.teacherRole.knowWhenTheyLeft')
  let reasonForLeaving = _.get(data, 'report.teacherRole.reasonForLeaving')
  let teachingElsewhere = _.get(data, 'report.teacherRole.teachingElsewhere')
  let knowWhereTheyWork = _.get(data, 'report.teacherRole.knowWhereTheyWork')
  let newOrganisationName = _.get(data, 'report.teacherRole.newOrganisation.name')

  if(!jobTitle) {
    return 'job-title'
  }
  if(!duties) {
    return 'duties'
  }

  if(type == 'public') {
    if(!knowWhereTheyWorked) {
      return 'know-where-they-worked'
    }

    if(knowWhereTheyWorked == 'Yes') {
      if(!organisationName) {
        return 'where-they-worked'
      }
    }
  }

  if(type == 'employer') {

    if(!sameOrganisation) {
      return 'same-organisation'
    }

    if(sameOrganisation == 'No') {
      if(!knowWhereTheyWorked) {
        return 'know-where-they-worked'
      }
      if(knowWhereTheyWorked == 'Yes') {
        if(!organisationName) {
          return 'where-they-worked'
        }
      }
    }

    if(!knowJobStartDate) {
      return 'start-date'
    }

    if(!stillEmployed) {
      return 'still-employed'
    }

    if(stillEmployed == 'No') {
      if(!knowWhenTheyLeft) {
        return 'end-date'
      }

      if(!reasonForLeaving) {
        return 'reason-for-leaving'
      }

      if(!teachingElsewhere) {
        return 'teaching-somewhere-else'
      }
    }

    if(teachingElsewhere == 'Yes') {
      if(!knowWhereTheyWork) {
        return 'know-where-they-work'
      }
    }

    if(knowWhereTheyWork == 'Yes') {
      if(!newOrganisationName) {
        return 'where-they-work'
      }
    }

  }

  return null
}

exports.getFirstIncompleteQuestionFromAllegation = (data) => {
  let type = _.get(data, 'report.type-of-report')
  let howTell = _.get(data, 'report.allegation.howTell')
  let alreadyConsidered = _.get(data, 'report.allegation.alreadyConsidered')
  let dbs = _.get(data, 'report.allegation.dbs')

  if(!howTell) {
    return 'allegation'
  }

  if(type == 'employer') {
    if(!dbs) {
      return 'dbs'
    }
  }

  if(type == 'public') {
    if(!alreadyConsidered) {
      return 'already-considered'
    }
  }

  return null
}

exports.getFirstIncompleteQuestionFromPreviousAllegations = (data) => {
  let type = _.get(data, 'report.type-of-report')
  let anyPrevious = _.get(data, 'report.previousMisconduct.anyPrevious')
  let howTell = _.get(data, 'report.previousMisconduct.howTell')

  if(type == 'employer') {
    if(!anyPrevious) {
      return 'any-previous'
    }

    if(anyPrevious == 'Yes') {
      if(!howTell) {
        return 'previous-misconduct'
      }
    }

  }

  return null
}

exports.getFirstIncompleteQuestionFromEvidence = (data) => {
  let hasEvidence = _.get(data, 'report.evidence.hasEvidence')
  let files = _.get(data, 'report.evidence.files')

  if(!hasEvidence) {
    return 'has-evidence'
  }

  if(hasEvidence == 'Yes') {
    if(!files) {
      return 'upload'
    }
  }

  return null
}