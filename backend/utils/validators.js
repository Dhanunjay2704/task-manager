const Joi = require('joi');

// User registration validation
exports.registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters',
      'string.max': 'Username cannot exceed 30 characters',
      'string.alphanum': 'Username must only contain alphanumeric characters',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
    }),
  role: Joi.string()
    .valid('user', 'admin')
    .optional()
    .messages({
      'any.only': 'Role must be either user or admin',
    }),
});

// User login validation
exports.loginSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      'string.empty': 'Username is required',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required',
    }),
});

// Task creation validation
exports.createTaskSchema = Joi.object({
  title: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.empty': 'Task title is required',
      'string.max': 'Title cannot exceed 100 characters',
    }),
  description: Joi.string()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Description cannot exceed 500 characters',
    }),
  status: Joi.string()
    .valid('pending', 'in-progress', 'completed')
    .optional()
    .messages({
      'any.only': 'Status must be pending, in-progress, or completed',
    }),
});

// Task update validation
exports.updateTaskSchema = Joi.object({
  title: Joi.string()
    .max(100)
    .optional()
    .messages({
      'string.max': 'Title cannot exceed 100 characters',
    }),
  description: Joi.string()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Description cannot exceed 500 characters',
    }),
  status: Joi.string()
    .valid('pending', 'in-progress', 'completed')
    .optional()
    .messages({
      'any.only': 'Status must be pending, in-progress, or completed',
    }),
}).min(1).messages({
  'object.min': 'At least one field must be provided for update',
});

// Query params validation for tasks
exports.taskQuerySchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'in-progress', 'completed')
    .optional(),
  search: Joi.string()
    .optional(),
  page: Joi.number()
    .integer()
    .min(1)
    .optional(),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .optional(),
  sortBy: Joi.string()
    .optional(),
});