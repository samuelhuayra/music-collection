const router = require('express').Router()
const ArtistModel = require('../models/artist.model')
const validations = require('../commons/validations')

router.post('/addArtist', async (req, res, next) => {
  try {
    validations.blank({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    const artist = new ArtistModel(req.body)
    const result = await artist.save()
    res.json(result)
  } catch (e) {
    next(e)
  }
})

router.get('/getArtists', async (req, res, next) => {
  try {
    const result = await ArtistModel.find().sort({ firstName: 'asc' }).exec()
    res.json(result)
  } catch (e) {
    next(e)
  }
})

router.get('/getArtist/:_id', async (req, res, next) => {
  try {
    validations.blank({
      _id: req.params._id
    })
    const artist = await ArtistModel.findById(req.params._id).exec()
    res.json(artist)
  } catch (e) {
    next(e)
  }
})

router.put('/editArtist/:_id', async (req, res, next) => {
  try {
    validations.blank({
      _id: req.params._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    await ArtistModel.findByIdAndUpdate(req.params._id, req.body).exec()
    const artist = await ArtistModel.findById(req.params._id).exec()
    res.json(artist)
  } catch (e) {
    next(e)
  }
})

router.delete('/deleteArtist/:_id', async (req, res, next) => {
  try {
    validations.blank({
      _id: req.params._id
    })
    var artist = await ArtistModel.deleteOne({ _id: req.params._id }).exec()
    res.json(artist)
  } catch (e) {
    next(e)
  }
})

module.exports = router
