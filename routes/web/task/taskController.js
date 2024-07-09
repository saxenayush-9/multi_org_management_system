const { catchAsyncError } = require("../../../middleware/handleError");
const { task, task } = require("../model");

const createTask = catchAsyncError(async (req, res) => {
  try {
    const { task_name, description, created_by, due_date } = req.body;
    const organization_id = req.params.organization_id;

    const newTask = await task.create({
      task_name,
      description,
      organization_id,
      created_by,
      due_date,
      created_at: new Date(),
    });

    res.status(201).json({
      task_id: newTask.id,
      task_name: newTask.task_name,
      description: newTask.description,
      organization_id: newTask.organization_id,
      created_by: newTask.created_by,
      due_date: newTask.due_date,
      created_at: newTask.created_at,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getTasks = catchAsyncError(async (req, res) => {
  try {
    const tasks = await task.findAll({
      where: Object.assign({}, req.query.id ? { uuid: req.query.id } : {}),
    });
    if (!tasks) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getOrgTasks = catchAsyncError(async (req, res) => {
  try {
    const tasks = await task.findAll({
      where: { organization_id: req.params.organization_id },
    });

    res.status(200).json({
      organization_id: req.params.organization_id,
      tasks: tasks.map((task) => ({
        task_id: task.id,
        task_name: task.task_name,
        description: task.description,
        created_by: task.created_by,
        due_date: task.due_date,
        created_at: task.created_at,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  createTask,
  getTasks,
  getOrgTasks,
};
