const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    // IMAGE FILES
    if (
      file.fieldname === "heroImage" ||
      file.fieldname === "images"
    ) {
      return {
        folder: "projects/images",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      };
    }

    // PDF FILES
    if (
      file.fieldname === "brochure" ||
      file.fieldname === "floorPlan"
    ) {
      return {
        folder: "projects/pdfs",
        resource_type: "raw",
        allowed_formats: ["pdf"],
      };
    }
  },
});

const upload = multer({ storage });

module.exports = upload;