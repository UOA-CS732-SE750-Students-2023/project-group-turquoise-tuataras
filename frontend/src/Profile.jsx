import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { intolerances } from './intolerances';

const animatedComponents = makeAnimated();

function Profile({ handleReset, handleIntolerances }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [selectedIntolerances, setSelectedIntolerances] = useState([]);

    const handleResetSubmit = (event) => {
        event.preventDefault();
        handleReset(username, password);
        };

    const handleIntolerancesSubmit = (event) => {
        event.preventDefault();
        handleIntolerances(selectedIntolerances);
        };
    

    return (
        <div>
        <Form onSubmit={handleResetSubmit}>
            <div style={{paddingTop: '5%'}}/>
            <h2 className='container'>Edit  Account</h2>
            <Card className='container' style={{padding: 10}}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Reset Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter New Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Reset Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                
                <Button variant="primary" type="submit" style={{ background: "#EC6E70", border: "none" }}>
                    Submit
                </Button>
            </Card>
        </Form>
        <Form onSubmit={handleIntolerancesSubmit}>
            <div style={{paddingTop: '5%'}}/>
            <h2 className='container'>Intolerances</h2>
            <Card className='container' style={{padding: 10}}>
                <div style={{paddingTop: '1%'}}/>
                <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={intolerances}
                onChange={(selectedOptions) => {
                    const values = selectedOptions.map((option) => option.value);
                    setSelectedIntolerances(values);
                }}
                placeholder="Select Intolerances"
                value={intolerances.filter((option) => selectedIntolerances.includes(option.value))}
                />
                <div style={{paddingTop: '1%'}}/>
                <Button variant="primary" type="submit" style={{ background: "#EC6E70", border: "none" }}>
                    Submit
                </Button>
            </Card>
        </Form>
        </div>
    );
}

export default Profile;