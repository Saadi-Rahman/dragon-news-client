import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Login = () => {
    const [error, setError] = useState('');
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            form.reset();
            setError('');
            navigate(from, {replace: true});
            toast.success('Login Success!!');
        })
        .catch(error => {
            console.error(error);
            setError(error.message);
        })
    }

    return (
        <div>
            <h2>Please Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" required />
                </Form.Group>

                <div className='d-flex align-items-center mb-2'>
                    <Button variant="primary fw-bold px-5 me-3" type="submit">Login</Button>
                    <small className="text-danger fw-bold m-0">{error}</small>
                </div>

                <Form.Group className='mb-3'>
                    <small>Don't have an account? Go to <Link to='/reigster'>Register</Link></small>
                </Form.Group>
            </Form>
        </div>
    );
};

export default Login;