const sampleActivities = [
  {
    id: "a1",
    name: "Morning Run Club",
    type: "running",
    description: "Start your day with an energizing group run!",
    location: {
      latitude: 34.052235,
      longitude: -118.243683,
      address: "Grand Park, Los Angeles"
    },
    dateTime: new Date('2025-04-20T08:00:00'),
    difficulty: "moderate",
    maxParticipants: 15,
    participants: []
  },
  {
    id: "a2",
    name: "Weekend Cycling Tour",
    type: "cycling",
    description: "Explore scenic routes with fellow cyclists",
    location: {
      latitude: 34.052235,
      longitude: -118.243683,
      address: "LA River Bike Path"
    },
    dateTime: new Date('2025-04-19T09:30:00'),
    difficulty: "challenging",
    maxParticipants: 10,
    participants: []
  },
  {
    id: "a3",
    name: "Yoga in the Park",
    type: "yoga",
    description: "Outdoor yoga session for all levels",
    location: {
      latitude: 34.052235,
      longitude: -118.243683,
      address: "Echo Park, Los Angeles"
    },
    dateTime: new Date('2025-04-18T07:00:00'),
    difficulty: "easy",
    maxParticipants: 20,
    participants: []
  },
  {
    id: "a4",
    name: "Downtown Running",
    type: "running",
    description: "Urban run through city streets",
    location: {
      latitude: 37.774929,
      longitude: -122.419416,
      address: "Union Square, San Francisco"
    },
    dateTime: new Date('2025-04-20T08:00:00'),
    difficulty: "moderate",
    maxParticipants: 15,
    participants: []
  }
];

module.exports = sampleActivities;