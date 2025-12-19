const express = require("express");
const router = express.Router();
const companyController = require("./../controller/companyController.js");

router.route("/")
            .post(companyController.addCompany).
            get(companyController.getCompany);

 router.route("/:id")
            .put(companyController.updateCompany);
                      

module.exports = router;
