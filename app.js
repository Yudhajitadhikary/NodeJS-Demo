const morgan = require('morgan');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/ApiError');
const GlobalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
});
app.use('/api', limiter);

const APIFeatures = require('./utils/apiFeatures');

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});
// app.get('/',(req,res)=>{
// res.status(200).json({message:'Hello from the server side!',app:'Natoure' })})
// app.post('/',(req,res)=>{
//     res.send('you can post to this endpoint.....')
// })
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(x)
  next();
});

// app.get('/api/v1/tours',getAllTours)
// app.get('/api/v1/tours/:id',getTour)
// app.post('/api/v1/tours',createTour)
// app.patch('/api/v1/tours/:id',updateTour)
// app.delete('/api/v1/tours/:id',deleteTour)
app.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'The Forest Hicker',
    user: 'Jonas',
  });
});
app.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'The Forest Hicker',
    user: 'Jonas',
  });
});

app.use('/', viewRouter);
app.use(helmet({ contentSecurityPolicy: false }));
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
app.all('*', (req, res, next) => {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: `Can't find ${req.originalUrl} on this server`,
  //   });
  //   const err = new Error(`Can't find ${req.originalUrl} on this server`);
  //   err.status = 'fail';
  //   err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(GlobalErrorHandler);
module.exports = app;
