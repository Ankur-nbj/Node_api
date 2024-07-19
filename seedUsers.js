const mongoose = require('mongoose');
const User = require('./src/models/user'); // Adjust the path if necessary
require('dotenv').config();

const uri = process.env.MONGO_URL; // Replace with your MongoDB URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const centralLatitude = 37.7749;
const centralLongitude = -122.4194;

const generateRandomOffset = (radius) => {
  // Radius in degrees (~10 km offset)
  const offset = radius / 111; // Rough conversion from km to degrees
  const latOffset = (Math.random() - 0.5) * 2 * offset;
  const lonOffset = (Math.random() - 0.5) * 2 * offset;
  return { latOffset, lonOffset };
};

const seedUsers = async () => {
  try {
    await User.deleteMany({}); // Clear existing users

    const users = [];
    for (let i = 0; i < 30; i++) {
      const { latOffset, lonOffset } = generateRandomOffset(10);
      const latitude = centralLatitude + latOffset;
      const longitude = centralLongitude + lonOffset;
      users.push({
        name: `User ${i + 1}`,
        latitude,
        longitude,
      });
    }

    await User.insertMany(users);
    console.log('Database seeded with 30 users.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedUsers();
