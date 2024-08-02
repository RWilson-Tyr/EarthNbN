const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const isProduction = environment === 'production';
const app = express();
const routes = require('./routes');
const { ValidationError } = require('sequelize');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(csurf({
  cookie: {
    secure: isProduction,
    sameSite: isProduction && "Lax",
    httpOnly: true
  }
}));

app.use(routes);


// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    if(errors.email){
      errors.email = 'User with that email already exists',
      err.message = 'User already exists',
      err.status = 500}
    if(errors.username){
      errors.username = 'User with that username already exists',
      err.message = 'User already exists',
      err.status = 500
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  console.log(err.message)
  if(err.message === "Forbidden"){res.status(403), res.json({message: err.message})}
  else if(err.message === "Invalid credentials"){res.status(401), res.json({message: err.message})}
  else if(err.message === "Spot couldn't be found"){res.status(404), res.json({message: err.message})}
  else if(err.title === 'Authentication required'){res.status(401), res.json({message: err.message})}
  // if(err.from === "Validate")
  // if(err.title){res.json({message: err.message, errors: err.errors})}
  
  else(res.status(err.status), res.json({message: err.message, errors: err.errors}))
  // else {
  // res.status(err.status || 500)};
  // res.json({
  //   title: err.title || 'Server Error',
  //   message: err.message,
  //   errors: err.errors,
  //   stack: isProduction ? null : err.stack
  // });
});

module.exports = app;
