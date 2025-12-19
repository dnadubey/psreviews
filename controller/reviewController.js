const Review=require('./../modal/reviewModel')

exports.submitReview=async (req, res) => {
  try {
    // const review = new Review({
    //   companyId: req.body.companyId,
    //   name: req.body.name,
    //   mobile: req.body.mobile,
    //   email: req.body.email,
    //   rating: req.body.rating,
    //   comment: req.body.comment
    // });

    // await review.save();

    const data= await Review.create(req.body);
    res.status(200).json({
        status:"Success",
        data:data
    })

    //res.send("<h2 style='text-align:center'>Thank you for your review ⭐</h2>");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to submit review");
  }
};
