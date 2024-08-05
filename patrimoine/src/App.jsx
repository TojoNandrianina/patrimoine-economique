import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';  
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Possessions from '../../models/possessions/Possession';

function App() {
  const [possessions, setPossessions] = useState([
    new Possessions("Tojo", "Ordinateur", 5000000, "10 Mars 2023", "25 Decembre 2090", 10),
    new Possessions("Teji", "Ford Mustang", 10000000, "skdjv", "ksjv", 16)
  ])
  return (
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
              <td className='text-center'>sdv</td>
              <td className='text-center'>sv</td>
              <td className='text-center'>sdv</td>
              <td className='text-center'>sdv</td>
              <td className='text-center'>{Date.now()}</td>
            </tr>
          ))}
      
      </tbody>
    </Table>
  )
}

export default App
