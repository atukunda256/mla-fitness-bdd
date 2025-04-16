const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const ActivityFinder = require('../../models/activity-finder');

let activityFinder;
let activities = {};
let userLocation;
let searchResults;
let joinResult;
let currentUserId = 'user1';

// Step 1: Given the following activities exist
Given('the following activities exist:', function(dataTable) {
  activityFinder = new ActivityFinder();

  dataTable.hashes().forEach(row => {
    const activity = {
      id: row.id,
      name: row.name,
      type: row.type,
      location: {
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude)
      },
      maxParticipants: parseInt(row.maxParticipants),
      participants: []
    };

    activities[row.id] = activity;
    activityFinder.addActivity(activity);
  });
});

// Step 2: Given the user is located at (latitude, longitude)
Given('I am at location {float}, {float}', function(latitude, longitude) {
  userLocation = {latitude, longitude}
})

When('I search for nearby activities', function() {
  searchResults = activityFinder.findNearbyActivities(userLocation);
})


