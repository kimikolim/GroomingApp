# Grooming App
A full-stack CRUD application that handles customer's queries and appointment booking requests using NodeJS, Mongoose, ExpressJS and EJS.

## System Requirements
1. NodeJS
1. MongoDB

## Environment variables (Example)
```
DB_HOST=<database_host>
DB_USER=<username>
DB_PASS=<password>
DB_NAME=<database_name>
```


## Features
1. Create, view, update and delete queries and appointment bookings
1. Relative timestamps of query/booking created and/or updated
1. Visual calendar events display

## Dependencies
Package Name | Description
--- | ---
nodemon | Automatically restarting the node application when file changes in the directory are detected
dotenv | Loads environment variables from a `.env` file
express | Minimalist web framework for node
mongodb | MongoDB driver for Node.js
mongoose | MongoDB object modeling tool designed to work in an asynchronous environment
ejs | Embedded javaScript templates
method-override | Override HTTP verbs such as `PATCH` or `DELETE`
moment | Parse, validate, manipulate, and display dates
fullcalendar | A full-sized event calendar with easily consumable combination of standard plugins
express-validator | a set of express.js middlewares that wraps validator.js validator and sanitizer functions


## Warning
This application is a work in progress and the early stages of development.
