import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Auth({ show, onHide }) {
    return (
        <Modal show={show} onHide={onHide}>
            <div className='auth_form'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" style={{ background: "#EC6E70", border: "none" }}>
                        Sign up
                    </Button>
                </Form>
            </div>
        </Modal>
    );
}

export default Auth;