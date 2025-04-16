class ActivityFinder {
  constructor() {
    this.activities = [];
  }

  addActivity(activity) {
    this.activities.push(activity);
  }

  findNearbyActivities(userLocation, options = {}) {
    const maxDistance = options.maxDistance || 10; // Default 10km
    const activityTypes = options.activityTypes || [];

    return this.activities
      .filter((activity) => {
        // Calculate distance
        const distance = this.calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          activity.location.latitude,
          activity.location.longitude
        );

        // Add distance to activity for reference and sorting
        activity.distance = distance;

        // Filter by distance
        if (distance > maxDistance) {
          return false;
        }

        // Filter by activity type if specified
        if (
          activityTypes.length > 0 &&
          !activityTypes.includes(activity.type)
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => a.distance - b.distance);
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  joinActivity(userId, activityId) {
    const activity = this.activities.find((a) => a.id === activityId);
    if (!activity) {
      return { success: false, error: "Activity not found" };
    }

    if (activity.participants.includes(userId)) {
      return { success: false, error: "Already joined this activity" };
    }

    if (activity.participants.length >= activity.maxParticipants) {
      return { success: false, error: "Activity is full" };
    }

    activity.participants.push(userId);
    return { success: true, activity };
  }

  getAllActivities() {
    return this.activities;
  }

  getActivityById(activityId) {
    return this.activities.find((a) => a.id === activityId);
  }
}

module.exports = ActivityFinder;
