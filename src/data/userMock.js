// src/data/userMock.js

export const USER_MAIN_DATA = [
  {
    id: 12,
    userInfos: {
      firstName: "Karl",
      lastName: "Dovineau",
      age: 31,
    },
    todayScore: 0.12, // Coherency in property names
    keyData: {
      calorieCount: 1930,
      proteinCount: 155,
      carbohydrateCount: 290,
      lipidCount: 50,
    },
    activityData: {
      // Add any additional data you may need for the project
      sessions: [
        /* ...array of session data */
      ],
    },
  },
  {
    id: 18,
    userInfos: {
      firstName: "Cecilia",
      lastName: "Ratorez",
      age: 34,
    },
    todayScore: 0.3, // Use 'todayScore' for consistency
    keyData: {
      calorieCount: 2500,
      proteinCount: 90,
      carbohydrateCount: 150,
      lipidCount: 120,
    },
    activityData: {
      sessions: [
        /* ...array of session data */
      ],
    },
  },
];
