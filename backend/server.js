const express = require('express')
const { readFileSync, writeFileSync } = require('fs');
const { json } = require('body-parser');
const cors = require('cors');
const { log } = require('console');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Remplacez par l'origine de votre frontend
  credentials: true
}));
app.use(json());

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

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
