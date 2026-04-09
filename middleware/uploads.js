const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    if (["heroImage", "images"].includes(file.fieldname)) {
      return {
        folder: "projects/images",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      };
    }

    if (["brochure", "floorPlan"].includes(file.fieldname)) {
      return {
        folder: "projects/pdfs",
        resource_type: "raw",
        allowed_formats: ["pdf"],
      };
    }

    // ⭐ PREVENT CRASH
    throw new Error(`Unexpected field: ${file.fieldname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 15MB
  },
});

module.exports = upload;