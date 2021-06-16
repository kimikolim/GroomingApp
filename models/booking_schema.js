const mongoose = require('mongoose')

const bookingRequestSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    address: {type: String, required: true},
    zip: {type: String, required: true},
    petName: {type: String, required: true},
    petBreed: {type: String, required: true},
    date: {type: Date, required: true},
    timeslot: {type: String, required: true},
    transport: {type: String},
    comments: {type: String},
    created_at: {type: Date},
    updated_at: {type: Date}
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })
  bookingRequestSchema.virtual('formatted_date')

const BookingModel = mongoose.model('bookingRequests', bookingRequestSchema)

module.exports = {
    BookingModel: BookingModel
}