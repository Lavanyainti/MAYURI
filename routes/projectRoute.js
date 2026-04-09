const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploads");

const {
  addProject,
  getProjects,
  getProjectById,
  getProjectsByStatus,
  updateProject,
  deleteProject,
} = require("../controller/projectController");


// ================= ADD PROJECT =================
router.post(
  "/add",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "brochure", maxCount: 1 },
    { name: "floorPlan", maxCount: 1 },
  ]),
  addProject
);

// ================= GET =================
router.get("/getProjects", getProjects);
router.get("/getProjectByID/:id", getProjectById);
router.get("/getProjectsByStatus", getProjectsByStatus);

// ================= UPDATE =================
router.put(
  "/updateProject/:id",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "brochure", maxCount: 1 },
    { name: "floorPlan", maxCount: 1 },
  ]),
  updateProject
);

// ================= DELETE =================
router.delete("/deleteProject/:id", deleteProject);

module.exports = router;