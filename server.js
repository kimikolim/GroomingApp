// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const method_override = require('method-override')
const groomController = require('./controllers/controller')
const mongoose = require('mongoose');
const moment = require("moment");





//Middleware
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(method_override('_method'))
// app.use(express.static('public'))
app.use(express.static(__dirname + "/public"));
app.locals.moment = require('moment')

// =======================================
//              ROUTES
// =======================================

app.get('/', groomController.index)

app.get('/calender', groomController.fullCalender)

app.get('/appointment', groomController.bookForm)

app.post('/appointment', groomController.bookingFormSubmit)

app.get('/contact', groomController.contactForm)

app.post('/contact', groomController.contactFormSubmit)

app.get('/admin', groomController.admin)

//ADMIN ACCESS ONLY

app.get('/admin/dashboard', groomController.dashboard)

app.get('/admin/dashboard/contact-queries', groomController.showContactQueries)

app.get('/admin/dashboard/booking-requests', groomController.showBookingRequests)

app.delete('/admin/dashboard/contact-queries/:id', groomController.deleteQuery)

app.patch('/admin/dashboard/contact-queries/:id', groomController.updateQuery)

app.delete('/admin/dashboard/booking-requests/:id', groomController.deleteBooking)

app.patch('/admin/dashboard/booking-requests/:id/owner', groomController.updateBookingOwner)

app.patch('/admin/dashboard/booking-requests/:id/pet', groomController.updateBookingPet)






// =======================================
//              LISTENER
// =======================================

//connecting to monngodb via moongoose
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin&replicaSet=atlas-ov6942-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,{useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.once('open', () => {
  // we're connected!
  console.log('Connection to server via mongoose successful');
  app.listen(port, () => {
    console.log(`Grooming app listening on port: http://localhost:${port}/`)
  });
});

db.on('error', () => {
  console.log("Mongoose connection failed");
});