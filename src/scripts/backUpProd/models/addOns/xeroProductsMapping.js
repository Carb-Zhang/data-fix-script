const mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , Mixed = Schema.Types.Mixed
  , addOnProductsMappingSchema = require('./addOnProductsMapping.js');

const XeroProductsMappingSchema = addOnProductsMappingSchema;
//productsMapping Schema : { productId : string, { itemID: string, name: string } }}
XeroProductsMappingSchema.index({ businessName: 1, "addOnId.productId": 1}, { unique: true });

module.exports = mongoose.model('XeroProductsMapping', XeroProductsMappingSchema);
