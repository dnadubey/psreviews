const express = require("express");
const router = express.Router();
const reviewController = require("./../controller/reviewController.js");

router.route("/")
            .post(reviewController.submitReview);
            
router.route("/:companyId")
            .get(reviewController.getReviews);            
           

                      

module.exports = router;
