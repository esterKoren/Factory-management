require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('Middlewares/auth');
const checkUserActions = require('Middlewares/checkUserActions');

const departmentController = require('Controller/departmentController');
const employeeController = require('Controller/employeeController');
const shiftController = require('Controller/shiftController');
const usersController = require('Controller/usersController');
const usersWsController = require('Controller/usersWsController');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Public route for login/register (no auth required)
app.use('/api/users', usersController);
app.use('/api/usersWs', usersWsController);

// Protected routes (require JWT and action check)
app.use('/api/departments', authMiddleware, checkUserActions, departmentController);
app.use('/api/employees', authMiddleware, checkUserActions, employeeController);
app.use('/api/shifts', authMiddleware, checkUserActions, shiftController);

// Default route
app.get('/', (req, res) => {
  res.send('Factory Management API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
