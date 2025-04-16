const express = require('express');
const router = express.Router();
const ActivityFinder = require('../models/activity-finder');
const sampleActivities = require('../data/activities');

// Initialize ActivityFinder with sample data
const activityFinder = new ActivityFinder();
sampleActivities.forEach(activity => activityFinder.addActivity(activity));

// Get all activities
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: activityFinder.getAllActivities()
  });
});

// Find nearby activities
router.get('/nearby', (req, res) => {
  const { lat, lng, type, maxDistance } = req.query;
  
  if (!lat || !lng) {
    return res.status(400).json({
      success: false,
      error: 'Latitude and longitude are required'
    });
  }
  
  const userLocation = {
    latitude: parseFloat(lat),
    longitude: parseFloat(lng)
  };
  
  const options = {
    maxDistance: maxDistance ? parseFloat(maxDistance) : 10
  };
  
  if (type) {
    options.activityTypes = [type];
  }
  
  const nearbyActivities = activityFinder.findNearbyActivities(userLocation, options);
  
  res.json({
    success: true,
    data: nearbyActivities
  });
});

// Get a specific activity
router.get('/:id', (req, res) => {
    const activity = activityFinder.getActivityById(req.params.id);
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        error: 'Activity not found'
      });
    }
    
    res.json({
      success: true,
      data: activity
    });
  });

// Join an activity
router.post('/:id/join', (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({
      success: false,
      error: 'User ID is required'
    });
  }
  
  const result = activityFinder.joinActivity(userId, req.params.id);
  
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error
    });
  }
  
  res.json({
    success: true,
    data: result.activity
  });
});

module.exports = router;