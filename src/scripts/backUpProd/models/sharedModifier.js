const mongoose = require('mongoose');
const { VariationSchema } = require('./product.js');

const SharedModifierSchema = VariationSchema.clone();
SharedModifierSchema.add({
    business: {
        type: String,
        required: true,
    },
});
SharedModifierSchema.remove('order');
SharedModifierSchema.set('timestamps', true);

SharedModifierSchema.index({ business: 1 }, { sparse: true });
SharedModifierSchema.index({ business: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('sharedModifier', SharedModifierSchema);
