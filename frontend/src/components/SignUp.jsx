import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSignup } from '../hooks/useSignup.js';

function SignUp({ show, onHide, setSignUpModalShow}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (event) => {
        event.preventDefault();
        await signup(username, password, setSignUpModalShow)
        };

    return (
        <Modal show={show} onHide={onHide}>
            <div className='auth_form'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    {error && <div className='error'>{error}</div>}
                    <Button disabled={isLoading} variant="primary" type="submit" style={{ background: "#EC6E70", border: "none" }}>
                        Sign up
                    </Button>

                </Form>
            </div>
        </Modal>
    );
}

export default SignUp;