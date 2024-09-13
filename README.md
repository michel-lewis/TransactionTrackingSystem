# Transaction Tracking System

An integrated system to handle transactions

## Front End

A React application created with npm create vite@latest.

To run the application, run the commands below:

### `yarn install` 
or 
## `npm install`
### `yarn dev`

The application now runs on port 3000
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Backend API

An Express application.

To run the api, run the commands below:

### `npm install`
### `npm start`

The application now runs on port 8000

### API Documentation

A documentation generated with Swagger
Open [http://localhost:8000/docs](http://localhost:8000/docs) to view it in the browser.

## Scheduler

The scheduler is essentially a recurring service that communicates with the REST API for storing
(mock) transactions

To run the scheduler, run the commands below:

### `npn install`
### `npm start`

The application now runs on port 4000
Each minutes, the scheduler create a new transactions.