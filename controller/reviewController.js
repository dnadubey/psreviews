const nodemailer = require("nodemailer");
const Review=require('./../modal/reviewModel')
const Company = require("../modal/companyModal");







exports.submitReview = async (req, res) => {
  try {
    const { rating, companyId, comment } = req.body;

    // Save review
    await Review.create(req.body);

    // Fetch company
    const company = await Company.findById(companyId);

    if (!company) {
      return res.send(`
        <h2 style="text-align:center">
          Thank you for your feedback ⭐
        </h2>
      `);
    }

    // If rating is 3 or below → send email
    if (rating <= 3) {
      if (company.negativeReviewEmail) {
        // Setup Nodemailer transporter (using Gmail as example)
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER, // your email
            pass: process.env.EMAIL_PASS, // your email password or app password
          },
        });

        // Email content
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: company.negativeReviewEmail,
          subject: `New Negative Review for ${company.name}`,
          html: `
            <h3>New Negative Review Received</h3>
            <p><strong>Rating:</strong> ${rating}</p>
            <p><strong>Comment:</strong> ${comment || "No comment provided"}</p>
          `,
        };

        // Send email
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error("Error sending email:", err);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }

      return res.send(`
        <h2 style="text-align:center">
          Thank you for your review ⭐
        </h2>
      `);
    }

    // If rating is 4 or above → redirect to Google review
    if (company.googleReviewLink) {
      return res.redirect(company.googleReviewLink);
    } else {
      return res.send(`
        <h2 style="text-align:center">
          Thank you for your feedback ⭐
        </h2>
      `);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};


// exports.submitReview = async (req, res) => {
//   try {
//     const { rating, companyId } = req.body;

//     // Save review
//     await Review.create(req.body);

//     // ⭐ Rating 4 or above → fetch company
//     const company = await Company.findById(companyId);

//     // ⭐ Rating 3 or below
//     if (rating <= 3) {
//       return res.send(`
//         <h2 style="text-align:center">
//           Thank you for your review ⭐
//         </h2>
//       `);
//     }

    

//     if (!company || !company.googleReviewLink) {
//       return res.send(`
//         <h2 style="text-align:center">
//           Thank you for your feedback ⭐
//         </h2>
//       `);
//     }

//     // Render Google review redirect page
//     if (company.googleReviewLink) {
//       // Only redirect if the link exists
//       return res.redirect(company.googleReviewLink);
//     } else {
//       // Optional: show a message if no review link is available
//       return res.send(`
//       <h2 style="text-align:center">
//         Thank you for your feedback ⭐
//       </h2>
//     `);
//     }
//     // return res.send(`
//     //   <!DOCTYPE html>
//     //   <html>
//     //   <head>
//     //     <title>Leave a Google Review</title>
//     //     <style>
//     //       body {
//     //         font-family: Arial, sans-serif;
//     //         background: #f5f5f5;
//     //         display: flex;
//     //         justify-content: center;
//     //         align-items: center;
//     //         height: 100vh;
//     //       }
//     //       .card {
//     //         background: white;
//     //         padding: 30px;
//     //         border-radius: 12px;
//     //         text-align: center;
//     //         box-shadow: 0 4px 10px rgba(0,0,0,0.1);
//     //       }
//     //       button {
//     //         margin-top: 20px;
//     //         padding: 12px 20px;
//     //         font-size: 16px;
//     //         background: #1a73e8;
//     //         color: white;
//     //         border: none;
//     //         border-radius: 6px;
//     //         cursor: pointer;
//     //       }
//     //       button:hover {
//     //         background: #1558b0;
//     //       }
//     //     </style>
//     //   </head>
//     //   <body>
//     //     <div class="card">
//     //       <h2>Thank you for your positive feedback ⭐⭐⭐⭐</h2>
//     //       <p>Would you like to leave a review on Google?</p>
//     //       <button onclick="window.location.href='${company.googleReviewLink}'">
//     //         Leave Review
//     //       </button>
//     //     </div>
//     //   </body>
//     //   </html>
//     // `);

//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// };




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

