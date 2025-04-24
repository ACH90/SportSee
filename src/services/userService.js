// import axios from "axios";

// Si tu utilises un mock, on peut simuler la récupération des données ici
import { USER_MAIN_DATA } from "../data/userMock";
import { USER_ACTIVITY } from "../data/userMock";
import { USER_PERFORMANCE } from "../data/userMock";
import { USER_AVERAGE_SESSIONS } from "../data/userMock";

/**
 * Fonction pour récupérer les données d'un utilisateur.
 * Pour l'instant, nous utilisons un mock, mais cette fonction
 * pourra être adaptée pour effectuer un appel API réel.
 */
export const getUserData = async (userId) => {
  //   console.log("Recherche utilisateur pour ID:", userId);
  try {
    // Simuler un délai comme si c'était un appel API réel
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(500); // Simule un délai de 500ms

    // Chercher l'utilisateur par son ID dans le mock
    const user = USER_MAIN_DATA.find(
      (user) => user.id === parseInt(userId, 10)
    );

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    return user;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données utilisateur:",
      error
    );
    throw error; // Rejeter l'erreur pour pouvoir la gérer ailleurs
  }
};

/**
 * Fonction pour récupérer les statistiques (par exemple, calories, protéines, etc.)
 * pour un utilisateur spécifique
 */
export const getUserStats = async (userId) => {
  try {
    const user = await getUserData(userId);
    return user.keyData; // Retourne les données statistiques de l'utilisateur
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des statistiques utilisateur:",
      error
    );
    throw error;
  }
};

/**
 * Fonction pour récupérer les données d’activité quotidienne
 */
export const getUserActivity = async (userId) => {
  try {
    const activityData = USER_ACTIVITY.find(
      (entry) => entry.userId === parseInt(userId)
    );
    if (!activityData) throw new Error("Activité non trouvée");

    return activityData.sessions; // on retourne juste les sessions
  } catch (error) {
    console.error("Erreur lors de la récupération de l’activité:", error);
    throw error;
  }
};

export const getUserAverageSessions = async (userId) => {
  try {
    const averageSessions = USER_AVERAGE_SESSIONS.find(
      (entry) => entry.userId === parseInt(userId)
    );
    if (!averageSessions) throw new Error("Sessions non trouvées");

    return averageSessions.sessions; // on retourne juste les sessions
  } catch (error) {
    console.error("Erreur lors de la récupération des sessions:", error);
    throw error;
  }
};

export const getUserPerformance = async (userId) => {
  try {
    const performance = USER_PERFORMANCE.find(
      (entry) => entry.userId === parseInt(userId)
    );
    if (!performance) throw new Error("Performance non trouvée");

    return performance.data; // on retourne juste les sessions
  } catch (error) {
    console.error("Erreur lors de la récupération de la performance:", error);
    throw error;
  }
};
