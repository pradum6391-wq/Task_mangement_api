
import Task from "../models/Task.js";

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Task title is required."
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully.",
            task
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all tasks of logged-in user
// @route   GET /api/tasks
export const getTasks = async (req, res) => {
    try {
        const { status, priority, search } = req.query;

        const filter = { user: req.user._id };

        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        const tasks = await Task.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }

        res.status(200).json({
            success: true,
            task
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid task ID."
        });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
export const updateTask = async (req, res) => {
    try {
        const allowedFields = [
            "title",
            "description",
            "status",
            "priority",
            "dueDate"
        ];

        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        if (updates.title !== undefined && !updates.title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Task title cannot be empty."
            });
        }

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully.",
            task
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully."
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid task ID."
        });
    }
};
