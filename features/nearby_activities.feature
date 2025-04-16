Feature: Find and Join Nearby Activities
  As a fitness app user
  I want to discover group activities near me
  So that I can exercise with others

  Scenario: Find all nearby activities
    Given the following activities exist:
      | id  | name                  | type     | latitude  | longitude   | maxParticipants |
      | a1  | Morning Run Club      | running  | 34.052235 | -118.243683 | 5               |
      | a2  | Weekend Cycling Tour  | cycling  | 34.052235 | -118.243683 | 10              |
      | a3  | Yoga in the Park      | yoga     | 34.052235 | -118.243683 | 15              |
      | a4  | Downtown Running      | running  | 37.774929 | -122.419416 | 8               |
    And I am at location 34.052235, -118.243683
    When I search for nearby activities
    Then I should see the following activities:
      | name                 | type    |
      | Morning Run Club     | running |
      | Weekend Cycling Tour | cycling |
      | Yoga in the Park     | yoga    |
    And I should not see "Downtown Running" in the results

  Scenario: Filter activities by type
    Given the following activities exist:
      | id  | name                  | type     | latitude  | longitude   | maxParticipants |
      | a1  | Morning Run Club      | running  | 34.052235 | -118.243683 | 5               |
      | a2  | Weekend Cycling Tour  | cycling  | 34.052235 | -118.243683 | 10              |
      | a3  | Yoga in the Park      | yoga     | 34.052235 | -118.243683 | 15              |
      | a4  | Downtown Running      | running  | 37.774929 | -122.419416 | 8               |
    And I am at location 34.052235, -118.243683
    When I search for nearby activities of type "running"
    Then I should see the following activities:
      | name              | type    |
      | Morning Run Club  | running |
    And I should not see "Weekend Cycling Tour" in the results

  Scenario: Successfully join an activity
    Given the following activities exist:
      | id  | name                  | type     | latitude  | longitude   | maxParticipants |
      | a1  | Morning Run Club      | running  | 34.052235 | -118.243683 | 5               |
    And I am at location 34.052235, -118.243683
    When I join the "Morning Run Club" activity
    Then I should receive a success message
    And the "Morning Run Club" should have 1 participant(s)

  Scenario: Cannot join a full activity
    Given the following activities exist:
      | id  | name                  | type     | latitude  | longitude   | maxParticipants |
      | a1  | Morning Run Club      | running  | 34.052235 | -118.243683 | 1               |
    And I am at location 34.052235, -118.243683
    And the "Morning Run Club" is full
    When I try to join the "Morning Run Club" activity
    Then I should receive an error "Activity is full"
