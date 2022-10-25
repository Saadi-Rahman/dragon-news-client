import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import toast from 'react-hot-toast';
import { FaGoogle, FaGithub, FaYoutube, FaFacebook, FaTwitter, FaWhatsapp, FaDiscord, FaShieldAlt, FaTasks } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import BrandCarousel from '../BrandCarousel/BrandCarousel';

const RightSideNav = () => {

    const {googleLogin} = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        googleLogin(googleProvider)
        .then(result => {
            const user = result.user;
            console.log(user);
            navigate(from, {replace: true});
            toast.success('Login Success!!');
        })
        .catch(error => console.error(error));
    }

    return (
        <div>
            <ButtonGroup className='w-100' vertical>
                <Button onClick={handleGoogleSignIn} className='mb-2' variant="outline-primary"><FaGoogle /> Continue with Google</Button>
                <Button className='mb-4' variant="outline-dark"><FaGithub /> Continue with GitHub</Button>  
            </ButtonGroup>
            <div>
                <h5>Find us on</h5>
                <ListGroup>
                    <ListGroup.Item className='mb-2'><FaFacebook /> Facebook</ListGroup.Item>
                    <ListGroup.Item className='mb-2'><FaYoutube /> YouTube</ListGroup.Item>
                    <ListGroup.Item className='mb-2'><FaTwitter /> Twitter</ListGroup.Item>
                    <ListGroup.Item className='mb-2'><FaWhatsapp /> WhatsApp</ListGroup.Item>
                    <ListGroup.Item className='mb-2'><FaDiscord /> Discord</ListGroup.Item>
                    <ListGroup.Item className='mb-2'><FaShieldAlt /> Privacy Policy</ListGroup.Item>
                    <ListGroup.Item className='mb-4'><FaTasks /> Terms & Condition</ListGroup.Item>
                </ListGroup>
            </div>
            <div>
                <BrandCarousel></BrandCarousel>
            </div>
        </div>
    );
};

export default RightSideNav;