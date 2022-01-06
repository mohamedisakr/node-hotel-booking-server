const {Schema, model} = require('mongoose')
const {ObjectId} = Schema

const hotelSchema = new Schema(
  {
    title: {type: String, required: 'Titel is required'},
    content: {type: String, required: 'Content is required', maxlength: 1000},
    location: {type: String},
    image: {type: String},
    price: {type: Number, required: 'Price is required', trim: true},
    from: {type: Date},
    to: {type: Date},
    bed: {type: Number},
    postedBy: {
      type: ObjectId,
      ref: 'user',
    },
  },
  {timestamps: true},
)

const Hotel = model('hotel', hotelSchema)
module.exports = Hotel
