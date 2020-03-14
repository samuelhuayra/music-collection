const router = require('express').Router()
const AlbumModel = require('../models/album.model')
const validations = require('../commons/validations')

router.post('/addAlbum', async (req, res, next) => {
  try {
    validations.blank({
      releaseDate: req.body.releaseDate,
      title: req.body.title,
      year: req.body.year
    })
    const album = new AlbumModel(req.body)
    const result = await album.save()
    res.json(result)
  } catch (e) {
    next(e)
  }
})

router.get('/getAlbums', async (req, res, next) => {
  try {
    const result = await AlbumModel.find().sort({ firstName: 'asc' }).exec()
    res.json(result)
  } catch (e) {
    next(e)
  }
})

router.get('/getAlbum/:_id', async (req, res, next) => {
  try {
    validations.blank({
      _id: req.params._id
    })
    const album = await AlbumModel.findById(req.params._id).exec()
    res.json(album)
  } catch (e) {
    next(e)
  }
})

router.put('/editAlbum/:_id', async (req, res, next) => {
  try {
    validations.blank({
      _id: req.params._id,
      releaseDate: req.body.releaseDate,
      title: req.body.title,
      year: req.body.year
    })
    await AlbumModel.findByIdAndUpdate(req.params._id, req.body).exec()
    const album = await AlbumModel.findById(req.params._id).exec()
    res.json(album)
  } catch (e) {
    next(e)
  }
})

router.delete('/deleteAlbum/:_id', async (req, res, next) => {
  try {
    validations.blank({
      _id: req.params._id
    })
    var album = await AlbumModel.deleteOne({ _id: req.params._id }).exec()
    res.json(album)
  } catch (e) {
    next(e)
  }
})

module.exports = router
