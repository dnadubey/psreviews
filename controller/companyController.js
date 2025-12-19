const Company=require('./../modal/companyModal')


exports.addCompany=async(req,res)=>{

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