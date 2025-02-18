import task from "../models/tasksModels.js";

export const createTask = async (req, res) => {
    try {
        const { description } = req.body;
        const userId = req.user._id;
        const taskCreated = await task.create({
            description,
            createdBy: userId
        });
        res.status(201).json(taskCreated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const taskUpdated = await task.findOneAndUpdate({ _id: id, createdBy: userId }, req.body, { new: true, runValidators: true });
        if (!taskUpdated) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(taskUpdated);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        //проверка на создателя задачи
        const userId = req.user._id;
        const taskDeleted = await task.findOneAndDelete({ _id: id, createdBy: userId }, req.body, { new: true, runValidators: true });
        //--//
        if (!taskDeleted) {
            return res.status(404).json({ error: 'Task not deleted' });
        }
        res.status(200).json(taskDeleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await task.find({ createdBy: userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getAllTasks = async (req, res) => {
    try {

        const tasks = await task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const taskId = await task.findOne({ _id: id, createdBy: userId });
        if (!taskId) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(taskId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}