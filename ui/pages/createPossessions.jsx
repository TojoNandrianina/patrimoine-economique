import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CreatePossession() {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Container className="p-4 shadow-lg rounded" style={{ backgroundColor: 'white', width: '80%' }}>
                <h2 className="mb-4 text-center">Create a New Possession</h2>
                <Form style={{ width: '100%', minHeight: '400px' }}>
                    <Row className="justify-content-center mb-4">
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <Form.Group className="mb-3 w-100">
                                <Form.Label>Libelle</Form.Label>
                                <Form.Control type="text" placeholder="Enter Libelle" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <Form.Group className="mb-3 w-100">
                                <Form.Label>Value</Form.Label>
                                <Form.Control type="text" placeholder="Enter Value" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-4">
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <Form.Group className="mb-3 w-100">
                                <Form.Label>Beginning date</Form.Label>
                                <Form.Control type="text" placeholder="Enter date" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <Form.Group className="mb-3 w-100">
                                <Form.Label>Taux</Form.Label>
                                <Form.Control type="text" placeholder="Enter taux" />
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
