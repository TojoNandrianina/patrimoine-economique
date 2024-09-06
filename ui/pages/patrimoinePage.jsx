
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import Possessions from '../../models/possessions/Possession';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import Flux from '../../models/possessions/Flux';
import BarChart from './BarChart';
import axios from "axios";

const patrimoinePage = () => {
  const [dateSelectionnee, setDateSelectionnee] = useState(new Date());
  const [possessions, setPossessions] = useState([]);
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);
  const [dateOuverture] = useState(new Date());

  const [chartData, setChartData] = useState([]);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [type, setType] = useState("jour");

  useEffect(() => {
    fetch('/donne.json')
      .then(response => response.json())
      .then(data => {
        const loadedPossessions = data.map(item => {
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

  const fetchData = async () => {
    try {
      console.log("Envoi des données : ", { type, dateDebut, dateFin });
      const response = await axios.post("https://patrimoine-economique-l0zb.onrender.com/patrimoine/range", {
        type,
        dateDebut,
        dateFin,
      });
      setChartData(response.data.valeur);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  const handleSubmitRange = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <h1 className="text-center mb-5 mt-5 text-primary ">CALCUL VALEUR DE LA PATRIMOINE</h1>
      <div className='d-flex justify-content-center mb-5'>
        <div>
          <a href="/">Return to home</a>
        </div>
      </div>

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
        <div>
          <label className='labelStyle'>Sélectionner une date :</label>
          <DatePicker
            selected={dateSelectionnee}
            onChange={(date) => setDateSelectionnee(date)}
            dateFormat="yyyy-MM-dd"
            className='datePickerStyle'
          />
        </div>
        <div>
          <Button className='buttonCalcule' variant='outline-primary' onClick={calculerValeurPatrimoine}>
            Calculer valeur patrimoine
          </Button>
        </div>
      </div>
      <div className="text-center mt-1">
        {valeurPatrimoine !== null && (
          <div className="valeurPat bg-primary">
            <h3 className='text-white pt-2'>Valeur Totale du Patrimoine :</h3>
            <p className='text-white'>{valeurPatrimoine.toFixed(2)}</p>
          </div>
        )}

      </div>

      <div className="container mt-5">
        <h1 className="text-center text-primary mb-4">Graphe</h1>
        <form onSubmit={handleSubmitRange} className="row g-3">
          <div className="col-md-4">
            <label htmlFor="dateDebut" className="form-label">Date Début:</label>
            <input
              id="dateDebut"
              type="date"
              className="form-control"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="dateFin" className="form-label">Date Fin:</label>
            <input
              id="dateFin"
              type="date"
              className="form-control"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="type" className="form-label">Type:</label>
            <select
              id="type"
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="jour">Jour</option>
              <option value="mois">Mois</option>
              <option value="année">Année</option>
            </select>
          </div>
          <div className="col-12">
            <Button className="w-100" variant="outline-primary" type="submit">
              Générer Graphique
            </Button>
          </div>
        </form>
        {chartData.length > 0 && (
          <div className="mt-5">
            <BarChart data={chartData} />
          </div>
        )}
      </div>

    </div>
  )
}

export default patrimoinePage;