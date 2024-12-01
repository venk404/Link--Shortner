const mongoose = require('mongoose');

// Define the schema for the shortener links
const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
    index: true // Makes searches faster
  },
  originalUrl: {
    type: String,
    required: true
  },
  visitHistory: [{
    timestamp : {type: Number}}],
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt`
});

// Create a model from the schema
const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
