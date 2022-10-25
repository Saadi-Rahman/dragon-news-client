import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Register = () => {
    const [error, setError] = useState('');
    const [accepted, setAccepted] = useState(false);
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, photoURL, email, password);

        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            setError('');
            form.reset();
            Navigate('/');
            handleUpdateUserProfile(name, photoURL);
        })
        .catch(error => {
            console.error(error);
            setError(error.message);
        });
    }

    const handleUpdateUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        updateUserProfile(profile)
            .then(() => {})
            .catch(error => console.error(error));
    }

    const handleAccepted = (event) => {
        setAccepted(event.target.checked);
    }

    return (
        <div>
            <h2>Register Here!!</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control name="photoURL" type="text" placeholder="Enter your Photo URL" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check 
                        type="checkbox" 
                        onClick={handleAccepted}
                        label={<>Accept <Link to='/terms'>Terms and conditions</Link></>} />
                </Form.Group>

                <div className='d-flex align-items-center mb-2'>
                    <Button variant="primary fw-bold px-5 me-3" type="submit" disabled={!accepted}>
                        Register
                    </Button>
                    <small className="text-danger fw-bold m-0">{error}</small>
                </div>

                <Form.Group className='mb-3'>
                    <small>Already have an account? Go to <Link to='/login'>Login</Link></small>
                </Form.Group>
            </Form>
        </div>
    );
};

export default Register;