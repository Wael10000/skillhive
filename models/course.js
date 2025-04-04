const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
  pricing: { type: Number, required: true, min: 0 }, // Monetization
  skills: [{ type: String }], // Skills covered in the course
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
    rating: { type: Number, min: 1, max: 5 }, // Rating from 1 to 5
    review: { type: String }, // Optional review text
  }],
  averageRating: { type: Number, default: 0 }, // Calculated average rating
}, { timestamps: true });

// Indexes for faster queries
courseSchema.index({ title: 1 }); // Index on title
courseSchema.index({ category: 1 }); // Index on category
courseSchema.index({ averageRating: -1 }); // Index on averageRating (descending)

module.exports = mongoose.model("Course", courseSchema);