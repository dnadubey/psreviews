const express = require("express");
const router = express.Router();
const companyController = require("../controller/companyController");
const upload = require("../middlewares/upload");

router
  .route("/")
  .post(upload.single("logo"), companyController.addCompany)
  .get(companyController.getCompany);

router
  .route("/:id")
  .put(companyController.updateCompany)
  .delete(companyController.deleteCompany);

router.get("/logo/:id", companyController.getCompanyLogo);

module.exports = router;










// const express = require("express");
// const router = express.Router();
// const companyController = require("../controller/companyController");
// const upload = require("../middlewares/upload");

// router
//   .route("/")
//   .post(upload.single("logo"), companyController.addCompany)
//   .get(companyController.getCompany);

// router
//   .route("/:id")
//   .put(companyController.updateCompany)
//   .delete(companyController.deleteCompany);

// router.get("/logo/:id", companyController.getCompanyLogo);

// module.exports = router;












// const router = express.Router();
// const companyController = require("./../controller/companyController.js");

// router.route("/")
//             .post(companyController.addCompany).
//             get(companyController.getCompany);

//  router.route("/:id")
//             .put(companyController.updateCompany).
//             delete(companyController.deleteCompany);
                      

// module.exports = router;
