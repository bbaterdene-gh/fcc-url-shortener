const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShortURLSchema = new Schema({
  url_id: { type: Number, unique: true },
  original_url: { type: String, unique: true },
}, { collection: 'short_urls' })

ShortURLSchema.statics.findMaxUrlIdAndCreate = function(callback) {
  this.find().sort('-url_id').limit(1).exec((err, short_urls) => {
    if (err || short_urls.length == 0) return callback(0)
    return callback(short_urls[0].url_id)
  })
}

module.exports = mongoose.model('ShortURL', ShortURLSchema)