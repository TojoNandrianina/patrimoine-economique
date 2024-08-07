import React, { useState , useEffect} from 'react';
import Table from 'react-bootstrap/Table';  
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Possessions from '../../models/possessions/Possession';
import Patrimoine from '../../models/Patrimoine';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';

function App() {
  const [dateSelectionnee, setDateSelectionnee] = useState(new Date());
  const [possessions, setPossessions] = useState([]);
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);

  useEffect(() => {
    fetch('/donne.json')
      .then(response => response.json())
      .then(donne => {
        const loadedPossessions = donne.map(item => 
          new Possessions(
            item.possesseur,
            item.libelle,
            parseFloat(item.valeur),
            new Date(item.dateDebut),
            new Date(item.dateFin),
            parseFloat(item.tauxAmortissement)
          )
        );
        setPossessions(loadedPossessions);
      })
      .catch(error => console.error('Erreur lors du chargement des données:', error));
  }, []);
  
  const patrimoine = new Patrimoine("Tojo", possessions);

  const calculerValeurPatrimoine = () => {
    const valeur = patrimoine.getValeur(dateSelectionnee);
    setValeurPatrimoine(valeur);
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
              <td className='text-center'>{possession.valeur} Ariary</td>
              <td className='text-center'>{possession.dateDebut.toDateString()}</td>
              <td className='text-center'>{possession.dateFin.toDateString()}</td>
              <td className='text-center'>{possession.tauxAmortissement}</td>
              <td className='text-center'>
                {possession.getValeur(dateSelectionnee)} Ariary
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
    `<div className="text-center mt-4">
        <Button variant='outline-primary' onClick={calculerValeurPatrimoine}>
          Calculer valeur patrimoine
        </Button>
        {valeurPatrimoine !== null && (
          <div className="mt-4">
            <h3>Valeur Totale du Patrimoine</h3>
            <p>{valeurPatrimoine} Ariary</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
