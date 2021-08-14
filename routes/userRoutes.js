const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');

const upload = multer({ dest: 'public/img/users' });

const router = express.Router();
router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//Protect all routes
router.use(authController.protect);

router.patch(
  '/updateMyPassword',
  // authController.protect,
  authController.updatePassword
);
router.patch(
  '/updateMe',
  // upload.single('photo'),
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  // authController.protect,
  userController.updateMe
);
router.delete(
  '/deleteMe',
  // authController.protect,
  userController.deleteMe
);
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;