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

// Step 2: And I am at location ...
Given('I am at location {float}, {float}', function(latitude, longitude) {
  userLocation = { latitude, longitude };
});

// Step 3: When I search for nearby activities
When('I search for nearby activities', function() {
  searchResults = activityFinder.findNearbyActivities(userLocation);
});

// Step 4: Then I should see the following activities
Then('I should see the following activities:', function(dataTable) {
  const expectedActivities = dataTable.hashes();

  assert.strictEqual(
    searchResults.length,
    expectedActivities.length,
    `Expected ${expectedActivities.length} activities, but got ${searchResults.length}`
  );

  expectedActivities.forEach((expected, index) => {
    const actual = searchResults[index];
    assert.strictEqual(actual.name, expected.name,
      `Expected activity at position ${index} to be "${expected.name}" but got "${actual.name}"`);

    assert.strictEqual(actual.type, expected.type,
      `Expected activity "${actual.name}" to be of type "${expected.type}" but got "${actual.type}"`);
  });
});

// Step 5: And I should not see "..." in the results
Then('I should not see {string} in the results', function(activityName) {
  const found = searchResults.some(activity => activity.name === activityName);
  assert.strictEqual(found, false, `Activity "${activityName}" should not be in the results but was found`);
});

// Step: When I search for nearby activities of type "..."
When('I search for nearby activities of type {string}', function(activityType) {
  searchResults = activityFinder.findNearbyActivities(userLocation, {
    activityTypes: [activityType]
  });
});

// Step: When I join the "..." activity
When('I join the {string} activity', function(activityName) {
  const activity = Object.values(activities).find(a => a.name === activityName);
  assert(activity, `Activity "${activityName}" not found`);

  joinResult = activityFinder.joinActivity(currentUserId, activity.id);
});

// Step: Then I should receive a success message
Then('I should receive a success message', function() {
  assert.strictEqual(joinResult.success, true, 'Expected join operation to succeed');
});

// Step: And the "..." should have X participant(s)
Then('the {string} should have {int} participant\\(s)', function(activityName, count) {
  const activity = Object.values(activities).find(a => a.name === activityName);
  assert(activity, `Activity "${activityName}" not found`);

  assert.strictEqual(activity.participants.length, count,
    `Expected "${activityName}" to have ${count} participant(s) but got ${activity.participants.length}`);
});

// Step: Given the "..." is full
Given('the {string} is full', function(activityName) {
  const activity = Object.values(activities).find(a => a.name === activityName);
  assert(activity, `Activity "${activityName}" not found`);

  for (let i = 0; i < activity.maxParticipants; i++) {
    activity.participants.push(`dummy_user_${i}`);
  }
});

// Step: When I try to join the "..." activity
When('I try to join the {string} activity', function(activityName) {
  const activity = Object.values(activities).find(a => a.name === activityName);
  assert(activity, `Activity "${activityName}" not found`);

  joinResult = activityFinder.joinActivity(currentUserId, activity.id);
});

// Step: Then I should receive an error "..."
Then('I should receive an error {string}', function(expectedError) {
  assert.strictEqual(joinResult.success, false, 'Expected join operation to fail');
  assert.strictEqual(joinResult.error, expectedError,
    `Expected error message "${expectedError}" but got "${joinResult.error}"`);
});
