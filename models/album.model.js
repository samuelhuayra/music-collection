const AlbumModel = require('mongoose').model('albums', {
  releaseDate: Date,
  rating: Number,
  title: String,
  year: Number,
  artists: [{ _id: String, firstName: String, lastName: String, birthDate: Date }]
})

module.exports = AlbumModel
