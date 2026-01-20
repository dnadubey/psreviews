const nodemailer = require("nodemailer");
const Review=require('./../modal/reviewModel')
const Company = require("../modal/companyModal");





exports.submitReview = async (req, res) => {
  try {
    const { rating, companyId } = req.body;

    // Save review
    await Review.create(req.body);

    // ⭐ Rating 4 or above → fetch company
    const company = await Company.findById(companyId);

    // ⭐ Rating 3 or below
    if (rating <= 3) {
      return res.send(`
        <h2 style="text-align:center">
          Thank you for your review ⭐
        </h2>
      `);
    }

    
    if (!company || !company.googleReviewLink) {
      return res.send(`
        <h2 style="text-align:center">
          Thank you for your feedback ⭐
        </h2>
      `);
    }

    // Render Google review redirect page
    if (company.googleReviewLink || company.faceBookReviewLink ||company.instagramReviewLink) {
      // Only redirect if the link exists
      // return res.redirect(company.googleReviewLink);

      return res.send(
       `
       <!DOCTYPE html>
<html>
<head>
  <title>Leave a Review</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 16px;
      background: #f5f5f5;
    }

    .card {
      background: #fff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      text-align: center;
      width: 100%;
      max-width: 360px;
    }

    h2 {
      margin-top: 0;
      font-size: 22px;
    }

    p {
      font-size: 14px;
      color: #555;
    }

    .btn {
      display: block;
      width: 100%;
      margin: 12px 0;
      padding: 14px;
      text-decoration: none;
      color: #fff;
      border-radius: 8px;
      font-weight: bold;
      font-size: 15px;
      transition: transform 0.15s ease, opacity 0.15s ease;
    }

    .btn:active {
      transform: scale(0.97);
      opacity: 0.9;
    }

    .google { background: #4285F4; }
    .facebook { background: #1877F2; }
    .instagram { background: #E1306C; }

    /* Tablet & above */
    @media (min-width: 600px) {
      .card {
        padding: 28px;
      }

      h2 {
        font-size: 24px;
      }

      .btn {
        font-size: 16px;
      }
    }
  </style>
</head>

<body>
  <div class="card">
    <h2>Leave a Review ⭐</h2>
    <p>Select a platform</p>

    ${company.googleReviewLink ? `
      <a class="btn google" href="${company.googleReviewLink}">
        Review on Google
      </a>
    ` : ''}

    ${company.faceBookReviewLink ? `
      <a class="btn facebook" href="${company.faceBookReviewLink}">
        Review on Facebook
      </a>
    ` : ''}

    ${company.instagramReviewLink ? `
      <a class="btn instagram" href="${company.instagramReviewLink}">
        Review on Instagram
      </a>
    ` : ''}
  </div>
</body>
</html>

       `
      )

    } else {
      // Optional: show a message if no review link is available
      return res.send(`
      <h2 style="text-align:center">
        Thank you for your feedback ⭐
      </h2>
    `);
    }
    // return res.send(`
    //   <!DOCTYPE html>
    //   <html>
    //   <head>
    //     <title>Leave a Google Review</title>
    //     <style>
    //       body {
    //         font-family: Arial, sans-serif;
    //         background: #f5f5f5;
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //         height: 100vh;
    //       }
    //       .card {
    //         background: white;
    //         padding: 30px;
    //         border-radius: 12px;
    //         text-align: center;
    //         box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    //       }
    //       button {
    //         margin-top: 20px;
    //         padding: 12px 20px;
    //         font-size: 16px;
    //         background: #1a73e8;
    //         color: white;
    //         border: none;
    //         border-radius: 6px;
    //         cursor: pointer;
    //       }
    //       button:hover {
    //         background: #1558b0;
    //       }
    //     </style>
    //   </head>
    //   <body>
    //     <div class="card">
    //       <h2>Thank you for your positive feedback ⭐⭐⭐⭐</h2>
    //       <p>Would you like to leave a review on Google?</p>
    //       <button onclick="window.location.href='${company.googleReviewLink}'">
    //         Leave Review
    //       </button>
    //     </div>
    //   </body>
    //   </html>
    // `);

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
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

