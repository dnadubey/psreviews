const Company=require('./../modal/companyModal')


exports.addCompany=async(req,res)=>{

  console.log("hi");
    try{
      const company=await Company.create(req.body);

      res.status(200).json({
        status:"Success",
        data:company,
      })
    }catch(err){
     res.status(400).json({
        status:"Failed",
        message:err.message
     })

    }

}

exports.getCompany=async(req,res)=>{

  console.log("hi");
    try{
      const companyData=await Company.find();

      res.status(200).json({
        status:"Success",
        data:companyData,
      })
    }catch(err){
     res.status(400).json({
        status:"Failed",
        message:err.message
     })

    }

}


exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,        // return updated document
        runValidators: true,
      }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        status: "Failed",
        message: "Company not found",
      });
    }

    res.status(200).json({
      status: "Success",
    //  data: updatedCompany,
    });

  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
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
