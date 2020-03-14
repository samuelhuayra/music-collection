const ArtistModel = require('mongoose').model('artists', {
  firstName: String,
  lastName: String,
  birthDate: Date
})

module.exports = ArtistModel
