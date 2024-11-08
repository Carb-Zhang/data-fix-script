const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FreeConditionSchema = new Schema({
    entity: {
        type: String,
        enum: ['transaction']
    },
    propertyName: {
        type: String,
        enum: ['total']
    },
    operator: {
        type: String,
        enum: ['gte']
    },
    operand: {
        type: [String],
    },
})


const MeasureSchema = new Schema({
  type: {
    type: String,
    enum: ['distance'],
    required: true
  },
  unit: {
    type: String,
    enum: ['km'],
    required: true
  },
  minValue: {
    type: Number,
    required: true
  },
  maxValue: {
    type: Number
  }
})

const BaseCalculationSchema = new Schema({
  originalRate: {
    type: Number
  },
  rate: {
    type: Number,
    required: true
  },
  measure: {
    type: MeasureSchema
  }
})

const AdditionalCalculationSchema = new Schema({
  additionalRate: {
    type: Number,
    required: true
  },
  additionalMeasureValue: {
    type: Number,
    required: true
  },
  measure: {
    type: MeasureSchema
  }
})

const RateCalculationSchema = new Schema({
  firstBase: {
    type: BaseCalculationSchema,
    required: true
  },
  secondBase: {
    type: BaseCalculationSchema
  },
  additions: {
    type: [AdditionalCalculationSchema]
  }
})

const DeliveryMethodSchema = new Schema({
    //Default name is Standard
    name: {
        type: String,
        required: true,
    },

    //Default type is Flat
    type: {
        type: String,
        required: true,
    },

    rateCalculation: {
      type: RateCalculationSchema
    },

    rate: {
        type: Number,
        required: function () {
          return this.shippingType && this.shippingType !== 'range'
        }
    },

    minShippingTime: {
        type: Number,
        required: function () {
          return this.shippingType && this.shippingType !== 'range'
      }
    },

    maxShippingTime: {
        type: Number,
        required: function () {
          return this.shippingType && this.shippingType !== 'range'
        }
    },

    //day, hour
    shippingTimeUnit: {
        type: String,
        required: function () {
          return this.shippingType && this.shippingType !== 'range'
        }
    },

    enableConditionalFreeShipping: {
        type: Boolean,
        default: false,
    },

    freeConditions: {
        type: [FreeConditionSchema],
    }
});

const ShippingZoneSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },

        shippingType: {
            type: String,
            enum: ['domestic', 'international', 'range'],
            required: true,
        },

        coveredCountries: {
            type: [String],
            required: function () {
                return this.shippingType === 'international'
            }
        },

        name: {
            type: String,
            required: true,
        },

        country: {
            type: String,
            required: function () {
                return this.shippingType === 'domestic'
            }
        },

        states: {
            type: [String],
            required: function () {
                return this.shippingType === 'domestic'
            }
        },

        postcodes: {
            type: [String],
            required: function () {
                return this.shippingType === 'domestic'
            }
        },

        deliveryMethods: {
            type: [DeliveryMethodSchema],
            required: true,
        },

        distance: {
          type: Number
        },

       logisticsRideType: {
          type: String,
          enum: ['CAR', 'MOTORCYCLE'],
        }
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

ShippingZoneSchema.index({ business: 1 });

module.exports = mongoose.model('ShippingZone', ShippingZoneSchema);
