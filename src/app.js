// This archive will be responsible to have the express configuration
import express from "express";
import morgan from "morgan";
import projectsRoutes from "./routes/projects.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

app.use(projectsRoutes);
app.use(tasksRoutes);

export default app;
