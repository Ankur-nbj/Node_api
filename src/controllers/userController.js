const User = require('../models/user');

// Haversine formula to calculate distance between two coordinates
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

exports.getUsersWithinRadius = async (req, res) => {
  try {
    const { lat, lon, page = 1, limit = 10 } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(latitude) || isNaN(longitude) || isNaN(pageNum) || isNaN(limitNum)) {
      return res.status(400).json({ error: 'Invalid input parameters' });
    }

    // Fetch all users from the database
    const users = await User.find();
    console.log('Users fetched:', users.length); // Log the number of users

    // Calculate distances and filter users within 10 km
    const usersWithDistances = users.map(user => {
      const distance = haversineDistance(latitude, longitude, user.latitude, user.longitude);
      console.log(`User ${user._id} distance: ${distance} km`); // Log distance
      return { ...user.toObject(), distance };
    }).filter(user => user.distance <= 10);

    console.log('Filtered users count:', usersWithDistances.length); // Log count of filtered users

    // Sort users by distance
    const sortedUsers = usersWithDistances.sort((a, b) => a.distance - b.distance);

    // Paginate the results
    const paginatedUsers = sortedUsers.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    // Send the response
    res.json({
      page: pageNum,
      limit: limitNum,
      total: sortedUsers.length,
      users: paginatedUsers
    });
  } catch (error) {
    console.error('Error in getUsersWithinRadius:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
