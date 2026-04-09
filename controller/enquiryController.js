const Enquiry = require('../model/enquiry');


// ✅ SAVE ENQUIRY (HOME / CONTACT / PROJECT)
const saveEnquiry = async (req, res) => {
  try {
    const { name, email, number, type,message, projectID, } = req.body;

    const newEnquiry = new Enquiry({
      name,
      email,
      number,
      type: type, 
      message,
      projectID: projectID || null,
    });

    const saved = await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: "Enquiry saved successfully",
      data: saved
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error saving enquiry"
    });
  }
};



const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry
      .find()
      .populate("projectID", "title") // 🔥 get project name
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      enquiries
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error fetching enquiries"
    });
  }
};



// ✅ OPTIONAL: FILTER BY TYPE (VERY USEFUL 🔥)
const getEnquiriesByType = async (req, res) => {
  try {
    const { type } = req.query;

    const filter = type ? { type } : {};

    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      enquiries
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error fetching enquiries"
    });
  }
};


module.exports = {
  saveEnquiry,
  getEnquiries,
  getEnquiriesByType
};