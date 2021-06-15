const moment = require("moment");
const { ContactModel } = require("../models/query_schema");
const { BookingModel } = require("../models/booking_schema");

module.exports = {
	index: (req, res) => {
		res.render("index");
	},

	admin: (req, res) => {
		res.render("adminLogin");
	},

	bookForm: (req, res) => {
		res.render("bookingForm");
	},

	contactForm: (req, res) => {
		res.render("contactForm");
	},

	fullCalender: async (req, res) => {
		try {
			let bookingMade = await BookingModel.find({}, {date: 1, timeslot: 1})
			// bookingMade.forEach(obj => {
			// 	let calendarDate = moment(obj.date).format("YYYY-MM-DD")
			// 	return calendarDate
			// });
			// console.log(calendarDate)
			res.render("calender", {bookingMade: bookingMade})
		}
		catch (err) {
			console.log(err);
			res.send('calendar error')
		}
	},

	dashboard: (req, res) => {
		res.render("dashboard");
	},

	showContactQueries: (req, res) => {
		ContactModel.find()
			.then((dataResp) => {
				res.render("contact-queries", { contactQueries: dataResp });
			})
			.catch((err) => {
				console.log(err);
			});
	},

	showBookingRequests: (req, res) => {
		BookingModel.find()
			.then((dataResp) => {
				res.render("booking-requests", { bookingRequests: dataResp });
			})
			.catch((err) => {
				console.log(err);
			});
	},

	//Contact Form POST request
	contactFormSubmit: (req, res) => {
		//need to validate entries

		ContactModel.create({
			name: req.body.name,
			email: req.body.email,
			mobile: req.body.mobile,
			comments: req.body.comments,
			created_at: moment().utc(),
			updated_at: moment().utc(),
		})
			.then((createResp) => {
				res.redirect("/");
				return;
			})
			.catch((err) => {
				console.log(err);
				res.status(400).send("submit query failed");
			});
	},

	//Appointment Booking POST request
	bookingFormSubmit: (req, res) => {
		//need to validate entries

		BookingModel.create({
			name: req.body.name,
			email: req.body.email,
			mobile: req.body.mobile,
			address: req.body.address,
			zip: req.body.zip,
			petName: req.body.petName,
			petBreed: req.body.petBreed,
			date: req.body.date,
			timeslot: req.body.timeslot,
			transport: req.body.transport,
			comments: req.body.comments,
			created_at: moment().utc(),
			updated_at: moment().utc(),
		})
			.then((createResp) => {
				res.redirect("/");
				return;
			})
			.catch((err) => {
				console.log(err);
				res.status(400).send("submit query failed");
			});
	},

	deleteQuery: (req, res) => {
		ContactModel.deleteOne({ _id: req.params.id })
			.then((delResp) => {
				res.redirect("/admin/dashboard/contact-queries");
			})
			.catch((err) => {
				console.log(err);
				res.send("query deletion error");
			});
	},

	updateQuery: (req, res) => {
		ContactModel.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					name: req.body.name,
					email: req.body.email,
					mobile: req.body.mobile,
					comments: req.body.comments,
					updated_at: moment().utc(),
				},
			}
		)
			.then((response) => {
				res.redirect(`/admin/dashboard/contact-queries`);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).send("edit query error");
			});
	},

	deleteBooking: (req, res) => {
		BookingModel.deleteOne({ _id: req.params.id })
			.then((delResp) => {
				res.redirect("/admin/dashboard/booking-requests");
			})
			.catch((err) => {
				console.log(err);
				res.send("booking deletion error");
			});
	},

	updateBookingOwner: (req, res) => {
		BookingModel.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					name: req.body.name,
					email: req.body.email,
					mobile: req.body.mobile,
					address: req.body.address,
					zip: req.body.zip,
					comments: req.body.comments,
					updated_at: moment().utc(),
				},
			}
		)
			.then((response) => {
				res.redirect(`/admin/dashboard/booking-requests`);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).send("edit owner error");
			});
	},

	updateBookingPet: (req, res) => {
		BookingModel.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					petName: req.body.petName,
					petBreed: req.body.petBreed,
					date: req.body.date,
					timeslot: req.body.timeslot,
					transport: req.body.transport,
					updated_at: moment().utc()
				},
			}
		)
			.then((response) => {
				res.redirect(`/admin/dashboard/booking-requests`);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).send("edit pet error");
			});
	},
};
