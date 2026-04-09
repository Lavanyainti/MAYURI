const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploads");
const { addProject, getProjects, getProjectById, getProjectsByStatus, updateProject, deleteProject } = require("../controller/projectController");


router.post('/add', 
  upload.uploadImages.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  upload.uploadPDFs.fields([
    { name: 'brochure', maxCount: 1 },
    { name: 'floorPlan', maxCount: 1 },
  ]),
  addProject
);

router.get("/getProjects", getProjects);
router.get("/getProjectByID/:id", getProjectById);
router.get('/getProjectsByStatus',getProjectsByStatus)

router.put("/updateProject/:id", upload.uploadImages.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  upload.uploadPDFs.fields([
    { name: 'brochure', maxCount: 1 },
    { name: 'floorPlan', maxCount: 1 },
  ]), updateProject);

router.delete("/deleteProject/:id", deleteProject);

module.exports = router;