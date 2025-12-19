const express=require('express');
const router=express.Router();
const companyController=require("./../controller/companyController.js")


router.route('/').post(companyController.addCompany);


module.exports=router;
