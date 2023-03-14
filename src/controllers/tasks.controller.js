import { Task } from "../models/Task.js";

export const getTask = async (req, res) => {
  try {
    const tasksFound = await Task.findAll();
    res.status(200).json({ message: "All ok", status: 200, data: tasksFound });
  } catch (error) {
    res.status(400).json({ message: error.message, status: 400, data: null });
  }
};

export const createTask = async (req, res) => {
  try {
    const { name, done, projectId } = req.body;
    const newTask = await Task.create({
      name,
      done,
      projectId,
    });

    res.status(200).json({
      message: "The task was register successfully",
      status: 200,
      data: newTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: 400, data: null });
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const tasksFound = await Task.findOne({
      where: {
        id,
      },
      attributes: ["name", "done"],
    });
    res
      .status(200)
      .json({ message: "The task was found", status: 200, data: tasksFound });
  } catch (error) {
    res.status(400).json({ message: error.message, status: 400, data: null });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskToUpdate = await Task.findOne({
      where: {
        id,
      },
    });
    taskToUpdate.set(req.body);
    await taskToUpdate.save();
    res.status(200).json({
      message: "Task was update",
      status: 200,
      taskUpdated: taskToUpdate,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message, status: 400, taskToUpdate: null });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskToResult = await Task.destroy({
      where: {
        id,
      },
    });
    res.status(204).json({ message: "The task was found", status: 204 });
  } catch (error) {}
};
