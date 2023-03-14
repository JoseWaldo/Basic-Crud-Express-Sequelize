import { Router } from "express";
import {
  getTask,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";

const router = Router();

router.get("/tasks", (req, res) => getTask(req, res));
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
