const Company = require("../modal/companyModal");
const { ObjectId } = require("mongodb");

/* ---------- ADD COMPANY ---------- */
exports.addCompany = async (req, res) => {
  try {
    const gfsBucket = req.app.get("gfsBucket");
    let logoId = null;

    if (req.file) {
      const uploadStream = gfsBucket.openUploadStream(
        req.file.originalname,
        { contentType: req.file.mimetype }
      );

      uploadStream.end(req.file.buffer);

      await new Promise((resolve, reject) => {
        uploadStream.on("finish", () => {
          logoId = uploadStream.id;
          resolve();
        });
        uploadStream.on("error", reject);
      });
    }

    const company = await Company.create({
      name: req.body.name,
      title: req.body.title,
      googleReviewLink: req.body.googleReviewLink,
      minimumRating: req.body.minimumRating,
      negativeReviewEmail: req.body.negativeReviewEmail,
      logo: logoId,
    });

    res.status(201).json({
      status: "Success",
      data: company,
    });

  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

/* ---------- GET ALL COMPANIES ---------- */
exports.getCompany = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json({
      status: "Success",
      data: companies,
    });

  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

/* ---------- UPDATE COMPANY ---------- */

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const gfsBucket = req.app.get("gfsBucket");

    // Find current company
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ status: "Failed", message: "Company not found" });
    }

    const updatedData = {
      name: req.body.name,
      title: req.body.title,
      googleReviewLink: req.body.googleReviewLink,
      minimumRating: req.body.minimumRating,
      negativeReviewEmail: req.body.negativeReviewEmail,
    };

    // If new logo uploaded
    if (req.file) {
      // Delete old logo if exists
      if (company.logo) {
        try {
          await gfsBucket.delete(new ObjectId(company.logo));
        } catch (err) {
          console.warn("Old logo delete failed:", err.message);
        }
      }

      // Upload new logo
      const uploadStream = gfsBucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      });
      uploadStream.end(req.file.buffer);

      await new Promise((resolve, reject) => {
        uploadStream.on("finish", () => {
          updatedData.logo = uploadStream.id; // Save new logo ID
          resolve(true);
        });
        uploadStream.on("error", reject);
      });
    }

    // Update company document
    const updatedCompany = await Company.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ status: "Success", data: updatedCompany });
  } catch (err) {
    res.status(400).json({ status: "Failed", message: err.message });
  }
};
// exports.updateCompany= async (req, res) => {
//   try {
//     const { id } = req.params;
//     const gfsBucket = req.app.get("gfsBucket");

//     // Prepare update fields
//     const updatedData = {
//       name: req.body.name,
//       title: req.body.title,
//       googleReviewLink: req.body.googleReviewLink,
//       minimumRating: req.body.minimumRating,
//       negativeReviewEmail: req.body.negativeReviewEmail,
//     };

//     // Update logo if new file is uploaded
//     if (req.file) {
//       const uploadStream = gfsBucket.openUploadStream(req.file.originalname, {
//         contentType: req.file.mimetype,
//       });
//       uploadStream.end(req.file.buffer);

//       await new Promise((resolve, reject) => {
//         uploadStream.on("finish", () => {
//           updatedData.logo = uploadStream.id; // Save new logo ID
//           resolve(true);
//         });
//         uploadStream.on("error", reject);
//       });
//     }

//     // Update company in MongoDB
//     const updatedCompany = await Company.findByIdAndUpdate(id, updatedData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedCompany) {
//       return res.status(404).json({ status: "Failed", message: "Company not found" });
//     }

//     res.status(200).json({ status: "Success", data: updatedCompany });
//   } catch (err) {
//     res.status(400).json({ status: "Failed", message: err.message });
//   }
// };









//   try {
//     const updatedCompany = await Company.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updatedCompany) {
//       return res.status(404).json({
//         status: "Failed",
//         message: "Company not found",
//       });
//     }

//     res.status(200).json({
//       status: "Success",
//       data: updatedCompany,
//     });

//   } catch (err) {
//     res.status(400).json({
//       status: "Failed",
//       message: err.message,
//     });
//   }
// };

/* ---------- DELETE COMPANY ---------- */
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        status: "Failed",
        message: "Company not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Company deleted successfully",
    });

  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

/* ---------- GET COMPANY LOGO ---------- */
exports.getCompanyLogo = (req, res) => {
  const gfsBucket = req.app.get("gfsBucket");

  gfsBucket
    .openDownloadStream(new ObjectId(req.params.id))
    .pipe(res);
};








// const Company=require('./../modal/companyModal')


// exports.addCompany=async(req,res)=>{

//   console.log("hi");
//     try{
//       const company=await Company.create(req.body);

//       res.status(200).json({
//         status:"Success",
//         data:company,
//       })
//     }catch(err){
//      res.status(400).json({
//         status:"Failed",
//         message:err.message
//      })

//     }

// }

// exports.getCompany=async(req,res)=>{

//   console.log("hi");
//     try{
//       const companyData=await Company.find();

//       res.status(200).json({
//         status:"Success",
//         data:companyData,
//       })
//     }catch(err){
//      res.status(400).json({
//         status:"Failed",
//         message:err.message
//      })

//     }

// }


// exports.updateCompany = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const updatedCompany = await Company.findByIdAndUpdate(
//       id,
//       req.body,
//       {
//         new: true,        // return updated document
//         runValidators: true,
//       }
//     );

//     if (!updatedCompany) {
//       return res.status(404).json({
//         status: "Failed",
//         message: "Company not found",
//       });
//     }

//     res.status(200).json({
//       status: "Success",
//     //  data: updatedCompany,
//     });

//   } catch (err) {
//     res.status(400).json({
//       status: "Failed",
//       message: err.message,
//     });
//   }
// };

// exports.deleteCompany = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedCompany = await Company.findByIdAndDelete(id);

//     if (!deletedCompany) {
//       return res.status(404).json({
//         status: "Failed",
//         message: "Company not found",
//       });
//     }

//     res.status(200).json({
//       status: "Success",
//       message: "Company deleted successfully",
//     });

//   } catch (err) {
//     res.status(400).json({
//       status: "Failed",
//       message: err.message,
//     });
//   }
// };
