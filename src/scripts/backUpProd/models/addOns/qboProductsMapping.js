const mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , Mixed = Schema.Types.Mixed
  , addOnProductsMappingSchema = require('./addOnProductsMapping.js');

const QBOProductsMappingSchema = addOnProductsMappingSchema;
//productsMapping Schema : { productId : ObjectId string, { qboId: string, qboName: string } }
QBOProductsMappingSchema.index({ businessName: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('QBOProductsMapping', QBOProductsMappingSchema);
