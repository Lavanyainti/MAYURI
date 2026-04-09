const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fulldescription: {
    type: String,
    required: true,
  },
  mapUrl: {
    type: String,
    required: true,
  },
  units: {
    type: String,
    required: true,
  },
  price: {   // ✅ fixed spelling
    type: String,
    required: true,
  },
  amenities: {
    type: [String],   // ✅ correct array
    required: true,
  },
  heroImage: {
    type: String,
    required: true,
  },
  images: {
    type: [String],   // ✅ multiple images
    required: true,
  },
  brochure: {   // ✅ fixed spelling
    type: String,
    required: true,
  },
  floorPlan: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;