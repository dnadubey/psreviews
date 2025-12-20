const Review=require('./../modal/reviewModel')

exports.submitReview=async (req, res) => {
  console.log(`req.body:${req.body}`);
  try {
    const data= await Review.create(req.body);
    

    res.send("<h2 style='text-align:center'>Thank you for your review ⭐</h2>");
  } catch (error) {
    console.error(error);
    res.status(500).send(err.message);
  }
};

exports.getReviews=async (req, res) => {
  console.log(`req.body:${req.body}`);
  try {
    const data= await Review.find({companyId:req.params.companyId});
    
    res.status(200).json({
      status:"Success",
      data:data
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(err.message);
  }
};

