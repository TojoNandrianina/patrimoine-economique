import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditionPage = () => {
    const { index } = useParams();  // Récupérer l'index depuis les paramètres de l'URL
    const navigate = useNavigate();
    const [possession, setPossession] = useState({
        libelle: '',
        valeur: '',
        dateDebut: new Date(),
        dateFin: null,
        tauxAmortissement: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://gestion-de-patrimoine.onrender.com/possession/edit/${index}`, {  // Requête PUT pour l'index
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(possession),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error updating possession');
                }
            })
            .then(() => {
                navigate('/possession');
            })
            .catch((error) => {
                console.error('Error updating possession:', error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Container className="p-4 shadow-lg rounded" style={{ backgroundColor: 'white', width: '80%' }}>
                <h2 className="mb-4 text-center">Edit Possession</h2>
                <Form style={{ width: '100%', minHeight: '400px' }} onSubmit={handleSubmit}>
                    <Row className="justify-content-center mb-4">
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <Form.Group className="mb-3 w-100">
                                <Form.Label>Libelle</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Libelle"
                                    value={possession.libelle || ''}
                                    onChange={(e) => setPossession({ ...possession, libelle: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <Form.Group className="mb-3 w-100">
                                <Form.Label>Valeur initiale</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Valeur Initiale"
                                    value={possession.valeur || ''}
                                    onChange={(e) => setPossession({ ...possession, valeur: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-4">
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <Form.Group className="mb-3 w-100">
                                <Form.Label>Date début</Form.Label>
                                <DatePicker
                                    selected={possession.dateDebut ? new Date(possession.dateDebut) : null}
                                    onChange={(date) => setPossession({ ...possession, dateDebut: date })}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    placeholderText="Select Date Début"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <Form.Group className="mb-3 w-100">
                                <Form.Label>Date fin</Form.Label>
                                <DatePicker
                                    selected={possession.dateFin ? new Date(possession.dateFin) : null}
                                    onChange={(date) => setPossession({ ...possession, dateFin: date })}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    placeholderText="Select Date Fin"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-4">
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <Form.Group className="mb-3 w-100">
                                <Form.Label>Amortissement</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Amortissement"
                                    value={possession.tauxAmortissement || ''}
                                    onChange={(e) => setPossession({ ...possession, tauxAmortissement: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="w-100 mb-5">
                        Update
                    </Button>
                    <div className="d-flex justify-content-around">
                        <div>
                            <a href="/">Return to home</a>
                        </div>
                        <div>
                            <a href="/possession">Show all possessions</a>
                        </div>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default EditionPage;
