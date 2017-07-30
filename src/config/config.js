export default {
  API: {
    affiliates: `/affiliates`,
    authenticate: `/users/authenticate`,
    changeStatus: `/users/changestatus`,
    clinics: `/clinicdetails`,
    createNotification: `/pushnotif/cr`,
    getActiveUserCount: `/users/tc/a`,
    getInactiveUserCount: `/users/tc/inacu`,
    getIncompleteUserCount: `/users/tc/incregu`,
    getCountAllAffiliates: `/affiliates/tc/a`,
    getCountLinkedAffiliates: `/affiliates/tc/lna`,
    getCountNoLinkAffiliates: `/affiliates/tc/nolna`,
    getNoOfClinics: `/doctordetails/clinics`,
    getUserCount: `/users/tc/a`,
    resetPassword: `/users/passwdres`,
    updateNoOfClinics: `/doctordetails/noc`,
    users: `/users`
  },
  STORAGE: {
    token: `kento`
  }
}
