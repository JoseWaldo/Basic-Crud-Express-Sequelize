import { Project } from "../models/Project.js";
import { Op } from "sequelize";
import { Task } from "../models/Task.js";

export const getProjects = async (req, res) => {
  const { name } = req.query;

  let projects;

  if (name) {
    projects = await Project.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Getting projects", data: projects });
  }

  projects = await Project.findAll();
  res.status(200).json({ message: "Getting projects", data: projects });
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const projectFounded = await Project.findOne({
      where: {
        id,
      },
    });
    if (!projectFounded)
      throw new Error(`Project whit the id: ${id} was not found`);
    res
      .status(200)
      .json({ message: "Project was found", status: 200, projectFounded });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

const getProjectByName = async (req, res) => {
  console.log(req.query);
  res.status(200).send("Todo bien");
};

export const createProject = async (req, res) => {
  const { name, priority, description } = req.body;
  const newProject = await Project.create({
    name,
    priority,
    description,
  });
  res.status(200).json({ message: "Project created", project: newProject });
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, priority, description } = req.body;

    const projectToUpdate = await Project.findByPk(id);

    projectToUpdate.name = name;
    projectToUpdate.priority = priority;
    projectToUpdate.description = description;

    await projectToUpdate.save();

    res.status(200).json({
      message: "project updated",
      status: 200,
      projectUpdated: projectToUpdate,
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findAll({
      where: {
        projectId: id,
      },
      attributes: ["name", "done"],
    });
    res.status(200).json({ data: task });
  } catch (error) {
    res.status(400).json({ message: error.message, status: 400, data: null });
  }
};
