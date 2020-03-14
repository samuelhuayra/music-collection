const router = require('express').Router()
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
 *                artists:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: String
 *                        example: 5e6d339aa85e7d0c6cc030b9
 *                      firstName:
 *                        type: String
 *                        example: Samuel
 *                      lastName:
 *                        type: String
 *                        example: Huayra
 *                      birthDate:
 *                        type: Date
 *                        example: 1995-11-05T15:54:49.119Z
 *                    required:
 *                      - _id
 *                      - firstName
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
 *            example: 5e6d339da85e7d0c6cc030ba
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
 *      summary: Edit an exist album
 *      tags: [Album]
 *      parameters:
 *        - in: path
 *          name: _id
 *          schema:
 *            type: string
 *            example: 5e6d339da85e7d0c6cc030ba
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
 *                artists:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: String
 *                        example: 5e6d339aa85e7d0c6cc030b9
 *                      firstName:
 *                        type: String
 *                        example: Samuel
 *                      lastName:
 *                        type: String
 *                        example: Huayra
 *                      birthDate:
 *                        type: Date
 *                        example: 1995-11-05T15:54:49.119Z
 *                    required:
 *                      - _id
 *                      - firstName
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
 *            example: 5e6d339da85e7d0c6cc030ba
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

module.exports = router
