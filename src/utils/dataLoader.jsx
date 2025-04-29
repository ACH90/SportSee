/**
 * Récupère les données utilisateur soit depuis les mocks locaux soit depuis une API distante.
 *
 * @async
 * @function fetchUserData
 * @param {string} type - Le type de données à charger. Peut être "main", "activity", "average" ou "performance".
 * @param {number} userId - L'identifiant de l'utilisateur pour lequel récupérer les données.
 * @returns {Promise<Object>} Une promesse résolue avec les données utilisateur correspondantes.
 * @throws {Error} Lance une erreur si le type est inconnu ou si la requête API échoue.
 *
 * @example
 * const data = await fetchUserData("main", 12);
 * console.log(data);
 */

const useMock = false;

import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../data/userMock";

// Fonction utilitaire GET (mock ou API)
export async function fetchUserData(type, userId) {
  if (useMock) {
    switch (type) {
      case "main":
        return USER_MAIN_DATA.find((user) => user.id === Number(userId));
      case "activity":
        return USER_ACTIVITY.find((item) => item.userId === Number(userId));
      case "average":
        return USER_AVERAGE_SESSIONS.find(
          (item) => item.userId === Number(userId)
        );
      case "performance":
        return USER_PERFORMANCE.find((item) => item.userId === Number(userId));
      default:
        throw new Error("Type de données inconnu.");
    }
  } else {
    // Récupération depuis une vraie API
    try {
      let url = `http://localhost:3000/user/${userId}`;

      // Adapter l'URL selon le type de données
      switch (type) {
        case "main":
          url = `${url}/`; // /user/:id
          break;
        case "activity":
          url = `${url}/activity`; // /user/:id/activity
          break;
        case "average":
          url = `${url}/average-sessions`; // /user/:id/average-sessions
          break;
        case "performance":
          url = `${url}/performance`; // /user/:id/performance
          break;
        default:
          throw new Error("Type de données inconnu.");
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erreur de requête API");
      }
      const data = await response.json();
      return data.data;
    } catch (err) {
      throw new Error("Erreur de chargement depuis l’API : " + err.message);
    }
  }
}

export default fetchUserData;
