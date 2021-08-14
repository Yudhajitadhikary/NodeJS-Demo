// const { updateOne } = require('../models/reviewModel');
const Review = require('../models/reviewModel');
// const catchAsync = require('../utils/catchAsynch');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.createReview = factory.createOne(Review);

// exports.createReview = catchAsync(async (req, res, next) => {
  // console.log(req.body)
  //Allow nested routes
  // if (!req.body.tour) req.body.tour = req.params.tourId;
  // if (!req.body.user) req.body.user = req.user.id;
  
  //   const newReview = await Review.create(req.body);
  //   res.status(201).json({
    //     status: 'success',
    //     data: {
      //       reviews: newReview,
      //     },
      //   });
      // });
      exports.getAllReviews = factory.getAll(Review)
      exports.getReview=factory.getOne(Review);
      exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
