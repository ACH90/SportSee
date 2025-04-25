// Pour activer ou désactiver l'utilisation du mock
const useMock = true;

// Imports des données mockées (en .js)
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../data/userMock";

// Fonction utilitaire GET (mock ou API)
export async function fetchUserData(type, userId) {
  if (useMock) {
    // Récupération depuis les mocks
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
      const response = await fetch(
        `http://localhost:3000/user/${userId}/${type}`
      );
      if (!response.ok) {
        throw new Error("Erreur de requête API");
      }
      const data = await response.json();
      return data.data; // ou juste data selon le format de l’API
    } catch (err) {
      throw new Error("Erreur de chargement depuis l’API : " + err.message);
    }
  }
}
