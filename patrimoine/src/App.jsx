import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';  
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Possessions from '../../models/possessions/Possession';
import Patrimoine from '../../models/Patrimoine';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [dateSelectionnee, setDateSelectionnee] = useState(new Date());
  const [possessions] = useState([
    new Possessions("Tojo", "Ordinateur", 5000, new Date("2023-03-10"), new Date("2024-01-02"), 10),
    new Possessions("Tojo", "Ford Mustang", 10000, new Date("2023-03-10"), new Date("2024-01-02"), 16),
  ]);
  
  const patrimoine = new Patrimoine("Tojo", possessions);

  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);

  const calculerValeurPatrimoine = () => {
    const valeur = patrimoine.getValeur(dateSelectionnee);
    setValeurPatrimoine(valeur);
  };

  return (
    <div>
      <h1 className="text-center mb-4">Liste des Possessions</h1>

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
    <div className="mb-4">
        <label>Sélectionner une date:</label>
        <DatePicker
          selected={dateSelectionnee}
          onChange={(date) => setDateSelectionnee(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
    `<div className="text-center mt-4">
        <button onClick={calculerValeurPatrimoine} className="btn btn-primary">
          Calculer Valeur du Patrimoine
        </button>
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
