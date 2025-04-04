const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  video: {
    url: { type: String }, // URL for embedded videos (e.g., YouTube, Vimeo)
    file: { type: String }, // Path to uploaded video file (if hosting yourself)
    duration: { type: Number }, // Video duration in seconds
  },
  quiz: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }], 
    correctAnswer: { type: String, required: true }, 
  }],
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Reference to the Course model
}, { timestamps: true });

// Index for faster queries
chapterSchema.index({ course: 1 }); 

module.exports = mongoose.model("Chapter", chapterSchema);