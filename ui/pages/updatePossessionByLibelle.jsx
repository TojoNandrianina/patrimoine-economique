import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function UpdateByLibelle() {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Container className="p-4 shadow-lg rounded" style={{ backgroundColor: 'white', width: '50%' }}>
                <h2 className="mb-4 text-center">Update Possession</h2>
                <Form style={{ minHeight: '300px' }}>
                    <Form.Group className="mb-4" controlId="formBasicText">
                        <Form.Label>Libelle</Form.Label>
                        <Form.Control type="text" placeholder="Enter Libelle" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicText">
                        <Form.Label>Date fin</Form.Label>
                        <Form.Control type="text" placeholder="Enter date" />
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
