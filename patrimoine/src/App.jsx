import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Possessions from '../../models/possessions/Possession';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import Flux from '../../models/possessions/Flux';

function App() {
  const [dateSelectionnee, setDateSelectionnee] = useState(new Date());
  const [possessions, setPossessions] = useState([]);
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);
  const [dateOuverture] = useState(new Date());

  useEffect(() => {
    fetch('/donne.json')
      .then(response => response.json())
      .then(data => {
        const patrimoineData = data.find(item => item.model === "Patrimoine").data;
        const loadedPossessions = patrimoineData.possessions.map(item => {
          const dateFin = item.dateFin ? new Date(item.dateFin) : null;
          const tauxAmortissement = item.tauxAmortissement || 0;

          if (tauxAmortissement === 0) {
            return new Flux(
              item.possesseur.nom,
              item.libelle,
              parseFloat(item.valeur),
              new Date(item.dateDebut),
              dateFin,
              tauxAmortissement,
              item.jour
            );
          } else {
            return new Possessions(
              item.possesseur.nom,
              item.libelle,
              parseFloat(item.valeur),
              new Date(item.dateDebut),
              dateFin,
              tauxAmortissement
            );
          }
        });
        setPossessions(loadedPossessions);
      })
      .catch(error => console.error('Erreur lors du chargement des données:', error));
  }, []);

  const calculerValeurPatrimoine = () => {
    let valeurTotale = 0;
    possessions.forEach(possession => {
      if (possession instanceof Flux) {
        valeurTotale += possession.getValeur(dateSelectionnee);
      } else {
        valeurTotale += possession.getValeur(dateSelectionnee);
      }
    });
    setValeurPatrimoine(valeurTotale);
  };

  

  return (
    <div>
      <h1 className="text-center mb-5 mt-5 text-primary ">LISTE DES POSSESSIONS</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='text-center'>Libelle</th>
            <th className='text-center'>Valeur Initial</th>
            <th className='text-center'>Date Debut</th>
            <th className='text-center'>Date Fin</th>
            <th className='text-center'>Amortissement</th>
            <th className='text-center'>Valeur Actuel</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession, index) => (
            <tr key={index}>
              <td className='text-center'>{possession.libelle}</td>
              <td className='text-center'>{possession.valeur.toFixed(2)} Ariary</td>
              <td className='text-center'>{possession.dateDebut.toDateString()}</td>
              <td className='text-center'>
                {possession.dateFin ? possession.dateFin.toDateString() : 'N/A'}
              </td>
              <td className='text-center'>
                {possession.tauxAmortissement !== null ? `${possession.tauxAmortissement}%` : 'N/A'}
              </td>
              <td className='text-center'>
                {possession.getValeur(dateOuverture).toFixed(2)} Ariary
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mb-4 mt-5">
        <label className='labelStyle'>Sélectionner une date :</label>
        <DatePicker
          selected={dateSelectionnee}
          onChange={(date) => setDateSelectionnee(date)}
          dateFormat="yyyy-MM-dd"
          className='datePickerStyle'
        />
      </div>
      <div className="text-center mt-4">
        <Button variant='outline-primary' onClick={calculerValeurPatrimoine}>
          Calculer valeur patrimoine
        </Button>
        {valeurPatrimoine !== null && (
          <div className="mt-4">
            <h3>Valeur Totale du Patrimoine</h3>
            <p>{valeurPatrimoine.toFixed(2)}</p>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default App;
