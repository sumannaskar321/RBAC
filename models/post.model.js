const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  decsription: { type: String, required: true },
  category: { type: Array, required: false }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);
