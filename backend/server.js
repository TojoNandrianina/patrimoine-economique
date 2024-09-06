import express from 'express';
import { promises as fs } from 'fs';
import cors from 'cors';
import Patrimoine from '../models/Patrimoine.js';
import bodyParser from 'body-parser';
import Possession from '../models/possessions/Possession.js';
import Flux from '../models/possessions/Flux.js';
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());

// Load donne
function loadData() {
  return JSON.parse(readFileSync('../ui/donne.json', 'utf8'));
}

// Save donne
function saveData(donne) {
  writeFileSync('../ui/donne.json', JSON.stringify(donne, null, 2));
}

// Get Possession list
app.get('/possession', (req, res) => {
  const donne = loadData();
  const possessions = donne.find(item => item.model === 'Patrimoine').data.possessions;
  res.json(possessions);
});

// Create Possession
app.post('/possession/create', (req, res) => {
  const { libelle, valeur, dateDebut, tauxAmortissement, jour, valeurConstante } = req.body;
  if (!libelle || !valeur || !dateDebut) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const donne = loadData();
  const possessions = donne.find(item => item.model === 'Patrimoine').data.possessions;

  const newPossession = {
    possesseur: { nom: "John Doe" },
    libelle,
    valeur,
    dateDebut,
    dateFin: null,
    tauxAmortissement,
    jour,
    valeurConstante
  };

  possessions.push(newPossession);
  saveData(donne);

  res.status(201).json(newPossession);
});

// Update Possession by libelle
app.put('/possession/:libelle', (req, res) => {
  const { libelle } = req.params;
  const { dateFin } = req.body;

  const donne = loadData();
  const possessions = donne.find(item => item.model === 'Patrimoine').data.possessions;

  const possession = possessions.find(p => p.libelle === libelle);
  if (!possession) {
    return res.status(404).json({ message: 'Possession not found' });
  }

  possession.dateFin = dateFin;
  saveData(donne);
  res.json(possession);
});

//edit possession
app.put('/possession/edit/:index', (req, res) => {
  const { index } = req.params;  // Obtenir l'index depuis les paramètres d'URL
  const { libelle, valeur, dateDebut, dateFin, tauxAmortissement } = req.body;

  const donne = loadData();
  const possessions = donne.find(item => item.model === 'Patrimoine').data.possessions;

  console.log(donne);


  // Vérifier si l'index est valide
  if (index < 0 || index >= possessions.length) {
    return res.status(404).json({ message: 'Index out of range' });
  }

  // Mettre à jour la possession à l'index spécifié
  possessions[index].libelle = libelle;
  possessions[index].valeur = valeur;
  possessions[index].dateDebut = dateDebut;
  possessions[index].dateFin = dateFin;
  possessions[index].tauxAmortissement = tauxAmortissement;

  saveData(donne);

  res.json(possessions[index]);
});

// Close Possession
app.patch('/possession/:libelle/close', (req, res) => {
  const { libelle } = req.params;

  const donne = loadData();
  const possessions = donne.find(item => item.model === 'Patrimoine').data.possessions;

  const possession = possessions.find(p => p.libelle === libelle);
  if (!possession) {
    return res.status(404).json({ message: 'Possession not found' });
  }

  possession.dateFin = new Date().toISOString();
  saveData(donne);

  res.json(possession);
});

app.delete('/possession/:libelle', (req, res) => {
  const { libelle } = req.params;

  const donne = loadData();
  const possessions = donne.find(item => item.model === 'Patrimoine').data.possessions;

  const updatedPossessions = possessions.filter(p => p.libelle !== libelle);

  if (possessions.length === updatedPossessions.length) {
    return res.status(404).json({ message: 'Possession not found' });
  }

  donne.find(item => item.model === 'Patrimoine').data.possessions = updatedPossessions;
  saveData(donne);

  res.status(200).json({ message: 'Possession deleted successfully' });
});

//patrimoine/range: Get Valeur Patrimoine Range
app.post('/patrimoine/range', async (req, res) => {
  try {
    const { type, dateDebut, dateFin } = req.body;

    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);

    if (isNaN(debut.getTime()) || isNaN(fin.getTime())) {
      return res.status(400).json({ error: "Dates invalides." });
    }

    const data = JSON.parse(await fs.readFile('../ui/donne.json', 'utf8'));

    const patrimoineData = data.find((item) => item.model === "Patrimoine");

    if (!patrimoineData) {
      return res.status(404).json({ error: "Patrimoine non trouvé." });
    }

    // Créez les instances de possessions correctement
    const possessions = patrimoineData.data.possessions.map(item => {
      if (item.tauxAmortissement) {
        return new Flux(
          item.possesseur.nom,
          item.libelle,
          parseFloat(item.valeur),
          new Date(item.dateDebut),
          item.dateFin ? new Date(item.dateFin) : null,
          item.tauxAmortissement,
          item.jour
        );
      } else {
        return new Possession(
          item.possesseur.nom,
          item.libelle,
          parseFloat(item.valeur),
          new Date(item.dateDebut),
          item.dateFin ? new Date(item.dateFin) : null
        );
      }
    });

    const patrimoine = new Patrimoine(
      patrimoineData.data.possesseur,
      possessions
    );

    let result = [];
    let currentDate = new Date(debut);

    while (currentDate <= fin) {
      const valeur = patrimoine.getValeur(new Date(currentDate));
      result.push({
        date: currentDate.toISOString().split("T")[0],
        valeur: valeur,
      });

      if (type === "mois") {
        currentDate.setMonth(currentDate.getMonth() + 1);
        currentDate.setDate(1);
      } else if (type === "année") {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        currentDate.setMonth(0);
        currentDate.setDate(1);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    if (type === "mois") {
      result = result.filter(
        (entry, index, self) =>
          index ===
          self.findIndex((e) => e.date.slice(0, 7) === entry.date.slice(0, 7))
      );
    } else if (type === "année") {
      result = result.filter(
        (entry, index, self) =>
          index ===
          self.findIndex((e) => e.date.slice(0, 4) === entry.date.slice(0, 4))
      );
    }

    res.json({ valeur: result });
  } catch (error) {
    console.error("Erreur lors de la récupération de la valeur du patrimoine :", error);
    res.status(500).json({
      error: "Erreur lors de la récupération de la valeur du patrimoine.",
    });
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
