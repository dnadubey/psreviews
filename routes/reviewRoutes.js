const express = require("express");
const router = express.Router();
const reviewController = require("./../controller/reviewController.js");

router.route("/")
            .post(reviewController.submitReview);
           

                      

module.exports = router;
