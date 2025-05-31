const express = require('express');
const router = express.Router();
const ReviewController = require('../controller/ReviewController');

router.post('/create-review', ReviewController.createReview);
router.put('/update-review/:id', ReviewController.updateReview);
router.delete('/delete-review/:id', ReviewController.deleteReview);
router.get('/find-review-by-id/:id', ReviewController.findReviewById);
router.get('/find-all-reviews', ReviewController.findAllReviews);

module.exports = router;