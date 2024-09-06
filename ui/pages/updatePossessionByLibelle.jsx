import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function UpdateByLibelle() {
    const [libelle, setLibelle] = useState('');
    const [dateFin, setDateFin] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!dateFin) {
            alert('Please select a date');
            return;
        }

        try {
            const response = await fetch(`https://patrimoine-economique-l0zb.onrender.com/possession/${libelle}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dateFin: dateFin.toISOString() }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Possession updated:', result);
                navigate('/possession'); // Redirect to the possessions page after success
            } else {
                const errorData = await response.json();
                console.error('Update failed:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Container className="p-4 shadow-lg rounded" style={{ backgroundColor: 'white', width: '50%' }}>
                <h2 className="mb-4 text-center">Update Possession</h2>
                <Form onSubmit={handleSubmit} style={{ minHeight: '300px' }}>
                    <Form.Group className="mb-4" controlId="formBasicText">
                        <Form.Label>Libelle</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Libelle"
                            value={libelle}
                            onChange={(e) => setLibelle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group
                        controlId="formBasicDate"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '30px'
                        }}>
                        <Form.Label>Date fin</Form.Label>
                        <DatePicker
                            selected={dateFin}
                            onChange={(date) => setDateFin(date)}
                            dateFormat="MMM d, yyyy"
                            placeholderText="Select a date"
                            className="form-control"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Update
                    </Button>

                    <div className='d-flex justify-content-around mt-4'>
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

export default UpdateByLibelle;
