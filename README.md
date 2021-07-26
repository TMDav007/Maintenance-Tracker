# Maintenance-Tracker

[![Build Status](https://travis-ci.org/TMDav007/Maintenance-Tracker.svg?branch=develop)](https://travis-ci.org/TMDav007/Maintenance-Tracker)
[![Coverage Status](https://coveralls.io/repos/github/TMDav007/Maintenance-Tracker/badge.svg?branch=develop)](https://coveralls.io/github/TMDav007/Maintenance-Tracker?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/abd7ab4951ad13d436d6/maintainability)](https://codeclimate.com/github/TMDav007/Maintenance-Tracker/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/abd7ab4951ad13d436d6/test_coverage)](https://codeclimate.com/github/TMDav007/Maintenance-Tracker/test_coverage)

This is a application that keep tracker of requests from users. This app will allow users make a request or requests or complaint to a maintenance tracking office, in which your request get approved and resolved or disapproved.
<img width="1433" alt="Screenshot 2021-07-25 at 01 39 18" src="https://user-images.githubusercontent.com/24706493/126931893-3ec4cd48-3536-4278-8695-9b2372727499.png">

## Table of Content
* [Technologies](#technologies)
* [Features](#features)
* [API Endpoints](#api-endpoints)
* [Frontend](#frontend)
* [Application images](#Application images)
* [Getting Started](#getting-started)
   * [Installation](#installation)
   * [Documentations](#documentations)
   * [Testing](#testing) 
* [Contribution](#contribution)
* [Author](#author)


### Pivotal Tracker
This Project is built and planned with Pivotal Tracker.
The link to the Project plan is at [http://www.pivotaltracker.com/n/projects/2171590](http://www.pivotaltracker.com/n/projects/2171590)

### Template
You can check the UI pages on [https://tmdav007.github.io/Maintenance-Tracker/UI/index.html](https://tmdav007.github.io/Maintenance-Tracker/UI/index.html)

### API Deployment
API is deployed at [https://maintaintracker.herokuapp.com/](https://maintaintracker.herokuapp.com/)

### Frontend
API is deployed at [https://maintaintracker.herokuapp.com/client](https://maintaintracker.herokuapp.com/client)

###Application Images - Desktop View
 - Landing page
 
<img width="1433" alt="Screenshot 2021-07-25 at 01 39 18" src="https://user-images.githubusercontent.com/24706493/126931893-3ec4cd48-3536-4278-8695-9b2372727499.png">

Register Page
<img width="1433" alt="Screenshot 2021-07-25 at 01 40 24" src="https://user-images.githubusercontent.com/24706493/126931918-e42dec50-72f5-469b-a0af-39fdfc8dc7a7.png">

Login Page

<img width="1436" alt="Screenshot 2021-07-25 at 01 41 24" src="https://user-images.githubusercontent.com/24706493/126931943-7fe9d7c1-7def-4a5b-90de-ab996da73cf6.png">

User Dashboard
<img width="1430" alt="Screenshot 2021-07-26 at 05 04 49" src="https://user-images.githubusercontent.com/24706493/126931967-83454d03-e087-4840-a643-761956610e29.png">

Mobile view

Landing page
<img width="368" alt="Screenshot 2021-07-26 at 05 06 03" src="https://user-images.githubusercontent.com/24706493/126931987-23e08ec1-8f69-4409-9ae9-36a3a37d361a.png">

Register page
<img width="442" alt="Screenshot 2021-07-26 at 05 06 36" src="https://user-images.githubusercontent.com/24706493/126932003-9a243f10-afc1-4cff-8f92-fed15182a0c3.png">


login Page
<img width="626" alt="Screenshot 2021-07-26 at 05 07 21" src="https://user-images.githubusercontent.com/24706493/126932016-a2dec935-ba55-46dc-93bd-cef11bf8ad94.png">

Dashboard 
<img width="355" alt="Screenshot 2021-07-26 at 05 05 20" src="https://user-images.githubusercontent.com/24706493/126932042-112f28bc-fdc2-4694-bad9-9fe25c8682e5.png">


## Technologies

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework

### Supporting Packages

#### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript

#### Test Tools

* [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests
* [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
* [Istanbul(nyc)](https://istanbul.js.org/) - Code Coverage Generator

## Features

### Request(user)
* Create a Request
* Modify a Request
* Get a Request
* Get All User Requests

### User
* Create a user
* Login a user

### Admin
* Get all requests
* Resolve a request
* Disapprove a request
* Approve a request

## API Endpoints

* Get All Users Request - api/v1/users/requests 

* Get A Users Request -  api/v1/users/requests/:requestId

* Post A Users Request - api/v1/users/requests

* PUT A Users Request - api/v1/users/requests/:requestId

* POST Create a user - api/v1/auth/signup

* POST login a user - api/v1/auth/login

* GET all request(admin) - api/v1/requests/

* PUT resolve a request(admin) - api/v1/requests/requestId/resolve

* PUT disapprove a request(admin) - api/v1/requests/requestId/disapprove

* PUT approve a request(admin) - api/v1/requests/requestId/approve

## Getting Started

### Installation

* git clone
  [Maintenance-Tracker](https://github.com/TMDav007/Maintenance-Tracker.git)
* Run `yarn install` or `npm install` to install packages
* Run `yarn build` or `npm run build` to build the project
* Run `yarn start` or `npm start` to start the server
* Navigate to [localhost:8000](http://localhost:8000/) in browser to access the
  application
  
 
### Documentations
- https://app.swaggerhub.com/apis/TMDav/maintenance-tracker/1

### Testing

#### Using Postman

* Navigate to [localhost:8000](http://localhost:8000/) in
  [Postman](https://getpostman.com/) to access the application

#### Using Mocha and Coverage Data
* Run `yarn test` or `npm test`
* It will run the test and display coverage data as generated by
  Istanbul's [nyc](https://github.com/istanbuljs/nyc)
  
## Contribution
* You can contribute to this project by the following process
- Fork the repo on Github
- Clone the project
- Create a branch
- Commit changes to the branch
- Push your work to your fork
- Make a pull request to review the changes

## Author
 - Afolabi, Opeyemi T., afolabi.toluwalase@yahoo.com.
