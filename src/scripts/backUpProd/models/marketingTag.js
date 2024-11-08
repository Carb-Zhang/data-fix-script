const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarketingTagSchema = new Schema(
	{
		tagName: {
			type: String,
			required: true,
		},

		businesses: {
			type: [String],
			required: true,
		},

		createdBy: {
			type: String,
		},

		modifiedBy: {
			type: String,
		}
	},
	{
		timestamps: {
			createdAt: 'createdTime',
			updatedAt: 'modifiedTime',
		},
	},
);

MarketingTagSchema.index({ tagName: 1 }, { unique: true });
module.exports = mongoose.model('MarketingTag', MarketingTagSchema);
