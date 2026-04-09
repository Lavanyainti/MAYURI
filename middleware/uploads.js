const multer = require("multer");

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../Config/cloudinary');

// Images storage
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'projects/images',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    resource_type: 'image'
  }
});

// PDFs storage (brochure/floorplan)
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'projects/pdfs',
    allowed_formats: ['pdf'],
    resource_type: 'raw'
  }
});

const uploadImages = multer({ storage: imageStorage });
const uploadPDFs = multer({ storage: pdfStorage });

module.exports = { uploadImages, uploadPDFs };
