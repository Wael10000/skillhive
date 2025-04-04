const Chapter = require("../models/chapter");

// Get all chapters for a course
exports.getChaptersByCourse = async (req, res) => {
  try {
    const chapters = await Chapter.find({ course: req.params.courseId });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific chapter by ID
exports.getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new chapter
exports.createChapter = async (req, res) => {
  const chapter = new Chapter({
    title: req.body.title,
    content: req.body.content,
    video: {
      url: req.body.video?.url,
      file: req.body.video?.file,
      duration: req.body.video?.duration,
    },
    quiz: req.body.quiz,
    course: req.body.course, // Course ID
  });

  try {
    const newChapter = await chapter.save();
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a chapter
exports.updateChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    // Update fields if they exist in the request body
    if (req.body.title) chapter.title = req.body.title;
    if (req.body.content) chapter.content = req.body.content;
    if (req.body.video?.url) chapter.video.url = req.body.video.url;
    if (req.body.video?.file) chapter.video.file = req.body.video.file;
    if (req.body.video?.duration) chapter.video.duration = req.body.video.duration;
    if (req.body.quiz) chapter.quiz = req.body.quiz;

    const updatedChapter = await chapter.save();
    res.json(updatedChapter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a chapter
exports.deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    await chapter.remove();
    res.json({ message: "Chapter deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};