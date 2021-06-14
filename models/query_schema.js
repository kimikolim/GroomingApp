const mongoose = require('mongoose')

const contactQueriesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    comments: {type: String, required: true},
    created_at: {type: Date},
    updated_at: {type: Date}

})

const ContactModel = mongoose.model('contactQueries', contactQueriesSchema)

module.exports = {
    ContactModel: ContactModel
}