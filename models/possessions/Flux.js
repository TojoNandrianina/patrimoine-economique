// THIS MAY CHANGE IN THE FUTURE
// dateDebut = 01/01/2024
// montant = 400_000
// jour = 1
import Possession from "./Possession.js";
export default class Flux extends Possession {
  // Si salaire => +
  // Si train de vie => -
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement)
    this.valeurA = 0;
    this.jour = jour;
    // this.source = source; // null || Compte
    // this.destination = destination; // Compte
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.valeurConstante = valeur
  }


  getValeur(date) {
    const nombreDeMois = (debut, dateEvaluation, jourJ) => {
      if (dateEvaluation < debut) return 0;

      // Si la date d'évaluation est après la date de fin, utiliser la date de fin
      if (this.dateFin && dateEvaluation > this.dateFin) {
        dateEvaluation = this.dateFin;
      }

      let mois = (dateEvaluation.getFullYear() - debut.getFullYear()) * 12 + (dateEvaluation.getMonth() - debut.getMonth());

      // Ajouter un mois si la date d'évaluation est après le jour spécifié du mois
      if (dateEvaluation.getDate() >= jourJ) {
        mois++;
      }

      // Ajuster le mois si la date d'évaluation est avant le jour spécifié
      if (debut.getDate() > jourJ) {
        mois--;
      }

      return mois;
    };

    const moisEcoules = nombreDeMois(this.dateDebut, date, this.jour);

    // Calcul de la valeur actuelle basée sur le nombre de mois écoulés
    this.valeurA = moisEcoules * this.valeurConstante;

    return this.valeurA;
  }
}