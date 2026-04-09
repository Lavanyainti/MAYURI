const express = require("express");
const router = express.Router();

const {
  saveEnquiry,
  getEnquiries,
  getEnquiriesByType
} = require("../controller/enquiryController");

router.post("/saveEnquiry", saveEnquiry);
router.get("/getEnquiries", getEnquiries);
router.get("/getEnquiriesByType", getEnquiriesByType);

module.exports = router;