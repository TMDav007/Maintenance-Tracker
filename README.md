# Maintenance-Tracker

[![Build Status](https://travis-ci.org/TMDav007/Maintenance-Tracker.svg?branch=develop)](https://travis-ci.org/TMDav007/Maintenance-Tracker)
[![Coverage Status](https://coveralls.io/repos/github/TMDav007/Maintenance-Tracker/badge.svg?branch=develop)](https://coveralls.io/github/TMDav007/Maintenance-Tracker?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/a9188a28f88a1705ed64/maintainability)](https://codeclimate.com/github/TMDav007/Maintenance-Tracker/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a9188a28f88a1705ed64/test_coverage)](https://codeclimate.com/github/TMDav007/Maintenance-Tracker/test_coverage)

This is a application that keep tracker of requests from users. This app will allow users make a request or requests or complaint to a maintenance tracking office, in which your request get approved and resolved or disapproved.

## Table of Content
* [Technologies](#technologies)
* [Features](#features)
* [API Endpoints](#api-endpoints)
* [Getting Started](#getting-started)
   * [Installation](#installation)
   * [Testing](#testing) 
* [Contribution](#contribution)
* [Author](#author)


### Pivotal Tracker
This Project is built and planned with Pivotal Tracker.
The link to the Project plan is at [http://www.pivotaltracker.com/n/projects/2171590](http://www.pivotaltracker.com/n/projects/2171590)

### UI
You can check the UI pages on [https://tmdav007.github.io/Maintenance-Tracker/UI/index.html](https://tmdav007.github.io/Maintenance-Tracker/UI/index.html)

### API Deployment
API is deployed at [https://maintaintracker.herokuapp.com/](https://maintaintracker.herokuapp.com/)


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

### Request
* Create a Request
* Modify a Request
* Get a Request
* Get All Requests

## API Endpoints

* Get All Users Request - GET api/v1/users/requests 

* Get A Users Request - GET api/v1/users/requests/:requestId

* Post A Users Request - POST api/v1/users/requests

* PUT A Users Request - PUT api/v1/users/requests/:requestId


## Getting Started

### Installation

* git clone
  [Maintenance-Tracker](https://github.com/TMDav007/Maintenance-Tracker.git)
* Run `yarn install` or `npm install` to install packages
* Run `yarn build` or `npm run build` to build the project
* Run `yarn start` or `npm start` to start the server
* Navigate to [localhost:8000](http://localhost:8000/) in browser to access the
  application
  
 
#### Documentation
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
