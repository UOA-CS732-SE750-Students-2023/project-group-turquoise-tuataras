import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { intolerances } from './intolerances';
import { useAuthContext } from './hooks/useAuthContext';

const animatedComponents = makeAnimated();

function Profile({ handleReset, handleIntolerances }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user } = useAuthContext()

    const [selectedIntolerances, setSelectedIntolerances] = useState([]);

    const handleResetSubmit = (event) => {
        event.preventDefault();

        // dont send reset request if user isn't logged in
        if (!user) {
            return
        }

        handleReset(username, password, user);
    };

    const handleIntolerancesSubmit = (event) => {
        event.preventDefault();

        // dont send intolerances request if user isn't logged in
        if (!user) {
            return
        }

        handleIntolerances(selectedIntolerances);
    };
    
    const [storedIntolerances, setStoredIntolerances] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const storedList = JSON.parse(localStorage.getItem(user.username + "_intolerances"));
        
        if (!storedList) {
            return
        }

        const convertedList = storedList.map(item => ({
            value: item,
            label: item
        }));
        setStoredIntolerances(convertedList);
        }, []);

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
                defaultValue={storedIntolerances}
                options={intolerances}
                onChange={(selectedOptions) => {
                    const values = selectedOptions.map((option) => option.value);
                    setSelectedIntolerances(values);
                }}
                placeholder="Select Intolerances"
                value={
                    selectedIntolerances.length > 0 
                        ? intolerances.filter((option) => selectedIntolerances.includes(option.value))
                        : storedIntolerances
                }
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