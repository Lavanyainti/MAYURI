const Project = require("../model/Project");
const cloudinary = require("../Config/cloudinary");

const addProject = async (req, res) => {
  try {
    const {
      title,
      location,
      status,
      description,
      fulldescription,
      mapUrl,
      units,
      price,
    } = req.body;

    const amenities = JSON.parse(req.body.amenities || "[]");

    const images = req.files?.images?.map(file => file.path) || [];
    const brochure = req.files?.brochure?.[0]?.path || "";
    const floorPlan = req.files?.floorPlan?.[0]?.path || "";
    const heroImage = req.files?.heroImage?.[0]?.path || "";

    console.log({
        "heroimage ": heroImage,
        "images ":images,
        "brochure ":brochure,
        "floorplan ":floorPlan
      });

    const newProject = new Project({
      title,
      location,
      status,
      description,
      fulldescription,
      mapUrl,
      units,
      price,
      amenities,
      heroImage,
      images,
      brochure,
      floorPlan,
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project Added Successfully",
      data: newProject,
    });

  } catch (error) {
    console.log("ERROR 👉", error);
  console.log("MESSAGE 👉", error.message);
  console.log("STACK 👉", error.stack);
    res.status(500).json({
      success: false,
      message: "Error adding project",
    });
  }
};



// ✅ GET ALL PROJECTS
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
       projects
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching project",
    });
  }
};

const getProjectsByStatus = async (req, res) => {
  try {
    const { status } = req.query; // get status from query string, e.g. ?status=ongoing

    let filter = {};
    if (status) {
      filter.status = status; // filter by status if provided
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
    });
  }
};

// ✅ UPDATE PROJECT
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Find existing project
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Update text fields if provided
    project.title = req.body.title || project.title;
    project.location = req.body.location || project.location;
    project.status = req.body.status || project.status;
    project.description = req.body.description || project.description;
    project.fulldescription = req.body.fulldescription || project.fulldescription;
    project.mapUrl = req.body.mapUrl || project.mapUrl;
    project.units = req.body.units || project.units;
    project.price = req.body.price || project.price;

    project.amenities = req.body.amenities
      ? JSON.parse(req.body.amenities)
      : project.amenities;

    // Update files if new ones uploaded (Cloudinary URLs)
    
    // Hero Image
    if (req.files?.heroImage?.[0]) {
      project.heroImage = req.files.heroImage[0].path;
    }

    // Gallery Images
    if (req.files?.images) {
      project.images = req.files.images.map(file => file.path);
    }

    // Brochure PDF
    if (req.files?.brochure?.[0]) {
      project.brochure = req.files.brochure[0].path;
    }

    // Floor Plan PDF
    if (req.files?.floorPlan?.[0]) {
      project.floorPlan = req.files.floorPlan[0].path;
    }

    // Save updates
    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating project",
    });
  }
};


// DELETE PROJECT
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // Helper to delete a single Cloudinary file
    const deleteFromCloudinary = async (url, resourceType = "image") => {
      if (!url) return;

      // Extract public_id from the Cloudinary URL
      const publicIdMatch = url.match(/\/([^/]+)\.[a-zA-Z]+$/);
      if (!publicIdMatch) return;

      const public_id = `${resourceType === "raw" ? "projects/pdfs/" : "projects/images/"}${publicIdMatch[1]}`;

      await cloudinary.uploader.destroy(public_id, { resource_type: resourceType });
    };

    // Delete heroImage
    await deleteFromCloudinary(project.heroImage, "image");

    // Delete gallery images
    if (project.images && project.images.length > 0) {
      for (const img of project.images) {
        await deleteFromCloudinary(img, "image");
      }
    }

    // Delete brochure (PDF)
    await deleteFromCloudinary(project.brochure, "raw");

    // Delete floorPlan (PDF)
    await deleteFromCloudinary(project.floorPlan, "raw");

    // Delete project from DB
    await Project.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Project deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error deleting project" });
  }
};


module.exports = { addProject,getProjects,getProjectById,getProjectsByStatus,updateProject,deleteProject };