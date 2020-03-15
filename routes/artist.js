const router = require('express').Router()
const ArtistModel = require('../models/artist.model')
const AlbumModel = require('../models/album.model')
const validations = require('../commons/validations')

/**
 * @swagger
 * path:
 *  /artist/addArtist:
 *    post:
 *      summary: Create a new artist
 *      tags: [Artist]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
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
 *                - firstName
 *                - lastName
 *      responses:
 *        '200':
 *          description: Artist created
 *        '400':
 *          description: Some paramenter is blank
 */
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

/**
 * @swagger
 * path:
 *  /artist/getArtists:
 *    get:
 *      summary: Get all artists order by firstName asc
 *      tags: [Artist]
 *      responses:
 *        '200':
 *          description: Artists obtained
 *        '400':
 *          description: Some paramenter is blank
 */
router.get('/getArtists', async (req, res, next) => {
  try {
    const result = await ArtistModel.find().sort({ firstName: 'asc' }).exec()
    res.json(result)
  } catch (e) {
    next(e)
  }
})

/**
 * @swagger
 * path:
 *  /artist/getArtist/{_id}:
 *    get:
 *      summary: Get an artist by _id
 *      tags: [Artist]
 *      parameters:
 *        - in: path
 *          name: _id
 *          schema:
 *            type: string
 *            example: 5e6e4f2de0475a219893ff56
 *          required: true
 *          description: Id of the artist
 *      responses:
 *        '200':
 *          description: Artist obtained
 *        '400':
 *          description: Some paramenter is blank
 */
router.get('/getArtist/:_id', async (req, res, next) => {
  try {
    validations.blank({
      _id: req.params._id
    })
    const artist = await ArtistModel.findOne({ _id: req.params._id }).exec()
    res.json(artist)
  } catch (e) {
    next(e)
  }
})

/**
 * @swagger
 * path:
 *  /artist/editArtist/{_id}:
 *    put:
 *      summary: Edit an exist artist by _id
 *      tags: [Artist]
 *      parameters:
 *        - in: path
 *          name: _id
 *          schema:
 *            type: string
 *            example: 5e6e4f2de0475a219893ff56
 *          required: true
 *          description: Id of the artist
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
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
 *                - firstName
 *                - lastName
 *      responses:
 *        '200':
 *          description: Artist edited
 *        '400':
 *          description: Some paramenter is blank
 */
router.put('/editArtist/:_id', async (req, res, next) => {
  try {
    validations.blank({
      _id: req.params._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    await ArtistModel.findByIdAndUpdate(req.params._id, req.body).exec()
    const data = req.body
    data._id = req.params._id
    await AlbumModel.updateMany({ artists: { $elemMatch: { _id: req.params._id } } }, { $set: { 'artists.$': req.body } })
    const artist = await ArtistModel.findOne({ _id: req.params._id }).exec()
    res.json(artist)
  } catch (e) {
    next(e)
  }
})

/**
 * @swagger
 * path:
 *  /artist/deleteArtist/{_id}:
 *    delete:
 *      summary: Delete an artist by _id
 *      tags: [Artist]
 *      parameters:
 *        - in: path
 *          name: _id
 *          schema:
 *            type: string
 *            example: 5e6e4f2de0475a219893ff56
 *          required: true
 *          description: Id of the artist
 *      responses:
 *        '200':
 *          description: Artist deleted
 *        '400':
 *          description: Some paramenter is blank
 */
router.delete('/deleteArtist/:_id', async (req, res, next) => {
  try {
    validations.blank({
      _id: req.params._id
    })
    var artist = await ArtistModel.deleteOne({ _id: req.params._id }).exec()
    await AlbumModel.updateMany({}, { $pull: { artists: { _id: req.params._id } } })
    res.json(artist)
  } catch (e) {
    next(e)
  }
})

module.exports = router
