const express = require("express");
const router = express.Router();
const reviewController = require("./../controller/reviewController.js");

router.route("/")
            .post(reviewController.submitReview);
            
router.route("/:companyId")
            .get(reviewController.getReviews);            
           

            // DATABASE=mongodb+srv://adityadubey:<PASSWORD>@cluster0.k3jf7tw.mongodb.net/psreviews

module.exports = router;
