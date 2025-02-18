import express from "express";
import * as taskController from "../controllers/taskController.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkAdmin from "../middlewares/checkAdmin.js";

const router = express.Router();

// router.use(checkAuth)

/**
 * @openapi
 * '/api/task':
 * post:
 *  tags:
 *  - Task
 *  summary: Create a task
 *  requestBody:
 *   required: true
 *   content:
 *    application/json:
 *     schema:
 *      type: object
 *      properties:
 *       description:
 *        type: string
 *        default: Task description
 *  responses:
 *   201:
 *    description: Task created
 *   400:
 *    description: Bad request
 */
router.post("/task", taskController.createTask);
router.get("/task", taskController.getTasks);
router.get("/task/:id", taskController.getTask);
router.put("/task/:id", taskController.updateTask);
router.delete("/task/:id", taskController.deleteTask);

router.get("/tasks/all", checkAdmin, taskController.getAllTasks);

export default router;