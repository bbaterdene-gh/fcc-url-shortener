const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/shorturl/:url_id', (req, res, next) => {
  res.locals.baseURL = req.baseUrl
  res.render('index')
})

router.post('/shorturl', (req, res, next) => {

})

module.exports = router;
