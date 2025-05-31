const express = require('express');
const router = express.Router();
const BookmarkController = require('../controller/BookmarkController');

router.post('/create-bookmark', BookmarkController.createBookmark);
router.put('/update-bookmark/:id', BookmarkController.updateBookmark);
router.delete('/delete-bookmark/:id', BookmarkController.deleteBookmark);
router.get('/find-bookmark-by-id/:id', BookmarkController.findBookmarkById);
router.get('/find-all-bookmarks', BookmarkController.findAllBookmarkRecords);

module.exports = router;