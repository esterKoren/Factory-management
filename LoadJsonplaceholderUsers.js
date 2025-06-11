require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const usersModel = require('./Models/user').usersModel;

console.log('process.env:', process.env); // הדפסת כל משתני הסביבה
const mongoURI = process.env.DB_URI;
console.log('mongoURI:', mongoURI); // בדיקת ערך משתנה הסביבה


const loadUsers = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');

    for (const user of users) {
      const existing = await usersModel.findById(user.id.toString());
      if (existing) {
        console.log(`User ${user.id} already exists, skipping...`);
        continue;
      }

      const newUser = new usersModel({
        _id: user.id.toString(), // מזהה מה-API החיצוני
        FullName: user.name,
        NumOfActions: 10, // ברירת מחדל לפעולות
      });

      await newUser.save();
      console.log(`User ${user.name} saved`);
    }

    console.log('All users processed');
  } catch (err) {
    console.error('Error loading users:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

loadUsers();
