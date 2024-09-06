import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import Possessions from '../../models/possessions/Possession';
import Button from 'react-bootstrap/Button';
import Flux from '../../models/possessions/Flux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';


const possessionsPage = () => {
    const [possessions, setPossessions] = useState([]);
    const [dateOuverture] = useState(new Date());
    const navigate = useNavigate();

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

    const handleClose = async (libelle) => {
        try {
            const response = await fetch(`https://patrimoine-economique-l0zb.onrender.com/possession/${libelle}/close`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedPossession = await response.json();
                console.log('Possession closed:', updatedPossession);

                const formatFin = format(new Date())

                setPossessions(prevPossessions =>
                    prevPossessions.map(possession =>
                        possession.libelle === libelle ? { ...possession, dateFin: formatFin } : possession
                    )
                );
            } else {
                const errorData = await response.json();
                console.error('Close failed:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        window.location.reload();
    };

    const handleDelete = async (libelle) => {
        try {
            const response = await fetch(`https://patrimoine-economique-l0zb.onrender.com/possession/${libelle}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message);

                // Update the state to remove the deleted possession
                setPossessions(prevPossessions =>
                    prevPossessions.filter(possession => possession.libelle !== libelle)
                );
            } else {
                const errorData = await response.json();
                console.error('Delete failed:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const navigateToHome = () => {
        navigate('/')
    }

    const navigateToCreatePossessionPage = () => {
        navigate('/possession/create')
    }

    const navigateToUpdatePossessionPage = () => {
        navigate('/possession/:libelle/update')
    }

    const navigateToEditionPage = (index) => {
        navigate(`/possession/edit/${index}`)
    }


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
                        <th className='text-center'>Action</th>
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
                            <td className='text-center'>
                                <Button onClick={() => navigateToEditionPage(index)} variant='primary'>edit</Button>
                                <Button onClick={() => handleClose(possession.libelle)} variant='secondary' style={{ marginLeft: '10px' }}>close</Button>
                                <Button onClick={() => handleDelete(possession.libelle)} variant='danger' style={{marginLeft: '10px'}}>delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className='d-flex justify-content-around mt-5'>
                <div>
                    <Button onClick={navigateToCreatePossessionPage} variant='outline-info'>Create possession</Button>
                </div>

                <div>
                    <Button onClick={navigateToHome}><FontAwesomeIcon icon={faHouse} className='font-icon' /></Button>
                </div>

                <div>
                    <Button onClick={navigateToUpdatePossessionPage} variant='outline-info'>Update possession by libelle</Button>
                </div>
            </div>
        </div>
    )
}

export default possessionsPage;