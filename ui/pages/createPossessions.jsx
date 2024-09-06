import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';

function CreatePossession() {
    // State to hold form values
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [taux, setTaux] = useState('');
    const [jour, setJour] = useState('');
    const [valeurConstante, setValeurConstante] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to be sent
        const data = {
            libelle,
            valeur,
            dateDebut,
            tauxAmortissement: taux,
            jour,
            valeurConstante,
        };

        try {
            const response = await fetch('http://localhost:3000/possession/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                navigate('/possession')
            }

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Container className="p-4 shadow-lg rounded" style={{ backgroundColor: 'white', width: '80%' }}>
                <h2 className="mb-4 text-center">Create a New Possession</h2>
                <Form style={{ width: '100%', minHeight: '400px' }} onSubmit={handleSubmit}>
                    <Row className="justify-content-center mb-4">
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <Form.Group className="mb-3 w-100">
                                <Form.Label>Libelle</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Libelle"
                                    value={libelle}
                                    onChange={(e) => setLibelle(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <Form.Group className="mb-3 w-100">
                                <Form.Label>Value</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Value"
                                    value={valeur}
                                    onChange={(e) => setValeur(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-4">
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <Form.Group className="mb-3 w-100">
                                <Form.Label>Beginning date</Form.Label>
                                <DatePicker
                                    selected={dateDebut}
                                    onChange={(date) => setDateDebut(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control"
                                    placeholderText="Select date"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <Form.Group className="mb-3 w-100">
                                <Form.Label>Taux</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter taux"
                                    value={taux}
                                    onChange={(e) => setTaux(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="w-100 mb-5">
                        Create
                    </Button>
                    <div className='d-flex justify-content-around'>
                        <div>
                            <a href="/">Return to home</a>
                        </div>
                        <div>
                            <a href="/possession">Show all possession</a>
                        </div>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default CreatePossession;
