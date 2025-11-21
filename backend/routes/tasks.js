const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  createTaskSchema,
  updateTaskSchema,
  taskQuerySchema,
} = require('../utils/validators');

// All routes are protected
router.use(protect);

router
  .route('/')
  .get(validate(taskQuerySchema, 'query'), getTasks)
  .post(validate(createTaskSchema), createTask);

router
  .route('/:id')
  .get(getTask)
  .put(validate(updateTaskSchema), updateTask)
  .delete(deleteTask);

module.exports = router;