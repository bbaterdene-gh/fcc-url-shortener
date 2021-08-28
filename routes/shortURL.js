const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const dns = require('dns')
const ShortURL = require('../models/short_url')
const mongoose = require('mongoose')
const db = mongoose.collections

/* GET home page. */
router.get('/shorturl/:url_id', (req, res, next) => {
  const { url_id } = req.params

  if (!url_id) {
    res.status(404)
    return res.send('Not Found')
  }

  ShortURL.findOne({ url_id: url_id }).exec((err, short_url) => {
    if (err || !short_url) {
      return res.json({
        error: "No short URL found for the given input"
      })
    }

    res.redirect(short_url.original_url)
  })
})

router.post(
  '/shorturl',
  body('url').trim(),
  (req, res, next) => {
  let url = req.body.url
  url = url.replace(/^https?:\/\//, '')
  url = url.replace(/\/$/, '')

  dns.lookup(url, (err) => {
    if (err) {
      return res.json({
        error: 'Invalid URL'
      })
    }
    ShortURL.findOne({ original_url: req.body.url }).exec((err, short_url) => {
      if (err) console.error(err)
      // already existed
      if (short_url) {
        return res.json({
          original_url: short_url.original_url,
          short_url: short_url.url_id,
        })
      } else {
        // newly create
        ShortURL.findMaxUrlIdAndCreate((maxUrlID) => {
          ShortURL.create({
            url_id: +maxUrlID + 1,
            original_url: req.body.url
          }, (err, short_url) => {
            if(err) console.error(err)
            return res.json({
              original_url: short_url.original_url,
              short_url: short_url.url_id,
            })
          })
        })
      }
    })
  })
})


module.exports = router;
