const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShortURLSchema = new Schema({
  url_id: { type: Number, unique: true },
  original_url: { type: String, unique: true },
})

module.exports = mongoose.model('ShortURL', ShortURLSchema)