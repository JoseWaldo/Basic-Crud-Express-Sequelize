import { Router } from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
  getProjectTasks,
} from "../controllers/projects.controller.js";

const router = Router();

router.get("/projects", getProjects);
router.get("/projects/:id", getProjectById);
router.post("/projects", createProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

// Se leeria como: del proyecto 1 traeme las tareas
router.get("/projects/:id/tasks", getProjectTasks);

export default router;
