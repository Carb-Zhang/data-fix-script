const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const UserActionLogSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        //only for fraudPrevent
        storeId: {
            type: String,
        },
        //only for fraudPrevent
        registerId: {
            type: Number,
        },
        time: {
            type: Date,
            required: true,
        },
        user: {
            type: String,
        },
        action: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
        },
        //Possible values are : back-office, import, parent product, api, db admin, app, support-tool
        source: {
            type: String,
        },
        ipAddress: {
            type: String,
        },
        //only for fraudPrevent
        additionalInfo: {
            type: Mixed,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

module.exports = function (additions, timestamps) {
  const UserActionLogBaseSchema = new Schema(UserActionLogSchema, {
      id: false,
      autoIndex: process.env.NODE_ENV == 'development',
      timestamps: timestamps,
  });
  if (additions) {
    UserActionLogBaseSchema.add(additions);
  }
  return UserActionLogBaseSchema;
};
