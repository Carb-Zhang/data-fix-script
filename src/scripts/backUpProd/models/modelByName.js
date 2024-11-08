const mongoose = require('mongoose');
let wrapModel = false

module.exports = {
    returnWrappedModel(wrap = false) {
        wrapModel = wrap;
    },
    getModel(collection, schema) {
        if (wrapModel) {
            return function(business, injectProperties = true) {
                return mongoose.model(collection, schema, null, null, {business}, injectProperties);
            }
        } else {
            return mongoose.model(collection, schema);
        }
    }
}