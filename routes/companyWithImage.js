const express = require("express");
const upload = require("../util/upload");
const Company = require("../modal/Company");

const router = express.Router();

router.post(
  "/company",
  upload.single("logo"),
  async (req, res) => {
    try {
      const company = new Company({
        name: req.body.name,
        title: req.body.title,
        logo: req.file.id, // GridFS file id
        googleReviewLink: req.body.googleReviewLink,
        minimumRating: req.body.minimumRating,
        negativeReviewEmail: req.body.negativeReviewEmail,
      });

      await company.save();

      res.status(201).json({ message: "Company created", company });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
