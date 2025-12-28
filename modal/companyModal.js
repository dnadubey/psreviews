const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    name: String,
    title: String,

    logo: {
      type: mongoose.Schema.Types.ObjectId, // GridFS file ID
    },

    googleReviewLink: String,
    minimumRating: Number,
    negativeReviewEmail: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("company", CompanySchema);









// const mongoose = require("mongoose");

// const CompanySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     title: {
//       type: String,
//       trim: true,
//     },

//     logo: {
//       type: String, // file path or CDN URL
//     },

//     googleReviewLink: {
//       type: String,
//       required: true,
//     },

//     minimumRating: {
//       type: Number,
//       min: 1,
//       max: 5,
//       default: 4,
//     },

//     negativeReviewEmail: {
//       type: String,
//       lowercase: true,
//       trim: true,
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     }
//   },
//   {
//     timestamps: true, // createdAt, updatedAt
//   }
// );

// module.exports = mongoose.model("company", CompanySchema);
