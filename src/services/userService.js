// src/services/userService.js
// import axios from "axios";

// Si tu utilises un mock, on peut simuler la récupération des données ici
import { USER_MAIN_DATA } from "../data/userMock";

/**
 * Fonction pour récupérer les données d'un utilisateur.
 * Pour l'instant, nous utilisons un mock, mais cette fonction
 * pourra être adaptée pour effectuer un appel API réel.
 */
export const getUserData = async (userId) => {
  console.log("Recherche utilisateur pour ID:", userId);
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
