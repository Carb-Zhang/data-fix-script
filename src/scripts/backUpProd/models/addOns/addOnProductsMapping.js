const mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , Mixed = Schema.Types.Mixed;

const AddonProductsMappingSchema = new Schema({
  businessName: {
    type: String,
    required: true
  },
  productsMapping: Mixed
}, {
  autoIndex: process.env.NODE_ENV == 'development'
});

module.exports = AddonProductsMappingSchema;
