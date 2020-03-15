const router = require('express').Router()
const createError = require('http-errors')
const AlbumModel = require('../models/album.model')
const validations = require('../commons/validations')

/**
 * @swagger
 * path:
 *  /album/addAlbum:
 *    post:
 *      summary: Create a new album
 *      tags: [Album]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                releaseDate:
 *                  type: Date
 *                  example: 1995-11-05T15:54:49.119Z
 *                rating:
 *                  type: Number
 *                  example: 5
 *                title:
 *                  type: String
 *                  example: New Album
 *                year:
 *                  type: Number
 *                  example: 1995
 *              required:
 *                - releaseDate
 *                - title
 *                - year
 *      responses:
 *        '200':
 *          description: Album created
 *        '400':
 *          description: Some paramenter is blank
 */
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

/**
 * @swagger
 * path:
 *  /album/getAlbums:
 *    get:
 *      summary: Get all albumnes order by title asc
 *      tags: [Album]
 *      responses:
 *        '200':
 *          description: Albums obtained
 */
router.get('/getAlbums', async (req, res, next) => {
  try {
    const result = await AlbumModel.find().sort({ title: 'asc' }).exec()
    res.json(result)
  } catch (e) {
    next(e)
  }
})

/**
 * @swagger
 * path:
 *  /album/getAlbum/{_id}:
 *    get:
 *      summary: Get an album by _id
 *      tags: [Album]
 *      parameters:
 *        - in: path
 *          name: _id
 *          schema:
 *            type: string
 *            example: 5e6e5187007de622acd845e7
 *          required: true
 *          description: Id of the album
 *      responses:
 *        '200':
 *          description: Album obtained
 *        '400':
 *          description: Some paramenter is blank
 */
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

/**
 * @swagger
 * path:
 *  /album/editAlbum/{_id}:
 *    put:
 *      summary: Edit an exist album by _id
 *      tags: [Album]
 *      parameters:
 *        - in: path
 *          name: _id
 *          schema:
 *            type: string
 *            example: 5e6e5187007de622acd845e7
 *          required: true
 *          description: Id of the album
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                releaseDate:
 *                  type: Date
 *                  example: 1995-11-05T15:54:49.119Z
 *                rating:
 *                  type: Number
 *                  example: 5
 *                title:
 *                  type: String
 *                  example: New Album
 *                year:
 *                  type: Number
 *                  example: 1995
 *              required:
 *                - releaseDate
 *                - title
 *                - year
 *      responses:
 *        '200':
 *          description: Album edited
 *        '400':
 *          description: Some paramenter is blank
 */
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

/**
 * @swagger
 * path:
 *  /album/deleteAlbum/{_id}:
 *    delete:
 *      summary: Delete an album by _id
 *      tags: [Album]
 *      parameters:
 *        - in: path
 *          name: _id
 *          schema:
 *            type: string
 *            example: 5e6e5187007de622acd845e7
 *          required: true
 *          description: Id of the album
 *      responses:
 *        '200':
 *          description: Album deleted
 *        '400':
 *          description: Some paramenter is blank
 */
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

/**
 * @swagger
 * path:
 *  /album/attachArtistToAlbum/{_id}:
 *    put:
 *      summary: Add an Artist to Album
 *      tags: [Album]
 *      parameters:
 *        - in: path
 *          name: _id
 *          schema:
 *            type: string
 *            example: 5e6e5187007de622acd845e7
 *          required: true
 *          description: Id of the album
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _artistId:
 *                  type: String
 *                  example: 5e6e519d007de622acd845e8
 *                firstName:
 *                  type: String
 *                  example: Samuel
 *                lastName:
 *                  type: String
 *                  example: Huayra
 *                birthDate:
 *                  type: Date
 *                  example: 1995-11-05T15:54:49.119Z
 *              required:
 *                - _id
 *                - firstName
 *                - lastName
 *      responses:
 *        '200':
 *          description: Artist attached
 *        '400':
 *          description: Some paramenter is blank
 *        '401':
 *          description: Artist already attached
 */
router.put('/attachArtistToAlbum/:_id', async (req, res, next) => {
  try {
    validations.blank({
      _id: req.params._id,
      _artistId: req.body._artistId,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    const exists = await AlbumModel.find({ _id: req.params._id, 'artists._id': req.body._artistId })
    if (exists && exists.length > 0) throw new Error(createError(401, 'Artist already attached'))
    const data = req.body
    data._id = req.body._artistId
    delete data._artistId
    await AlbumModel.updateOne({ _id: req.params._id }, { $push: { artists: data } })
    const album = await AlbumModel.findById(req.params._id).exec()
    res.json(album)
  } catch (e) {
    next(e)
  }
})

/**
 * @swagger
 * path:
 *  /album/removeArtistFromAlbum/{_id}:
 *    put:
 *      summary: Add an Artist to Album
 *      tags: [Album]
 *      parameters:
 *        - in: path
 *          name: _id
 *          schema:
 *            type: string
 *            example: 5e6e5187007de622acd845e7
 *          required: true
 *          description: Id of the album
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _artistId:
 *                  type: String
 *                  example: 5e6e519d007de622acd845e8
 *              required:
 *                - _id
 *      responses:
 *        '200':
 *          description: Artist removed
 *        '400':
 *          description: Some paramenter is blank
 */
router.put('/removeArtistFromAlbum/:_id', async (req, res, next) => {
  try {
    validations.blank({
      _id: req.params._id,
      _artistId: req.body._artistId
    })
    await AlbumModel.updateOne({ _id: req.params._id }, { $pull: { artists: { _id: req.body._artistId } } })
    const album = await AlbumModel.findById(req.params._id).exec()
    res.json(album)
  } catch (e) {
    next(e)
  }
})
module.exports = router
