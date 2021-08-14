const express = require('express');
// const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
router.get(
  '/checkout-session/:tourId',
  authController.protect,
  // bookingController.getCheckoutSession
);
module.exports = router;
