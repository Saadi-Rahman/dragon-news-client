import React, { useContext } from 'react';
import { Button, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaDragon, FaPlus, FaSignInAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import LeftSideNav from '../LeftSideNav/LeftSideNav';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
        .then( () => {})
        .catch(error => console.error(error))
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light mb-5 shadow">
            <Container>
                <Link to='/'><Navbar.Brand className='rounded bg-primary text-white px-3 py-2 fw-bold'>Dragon News<FaDragon /></Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">World News</Nav.Link>
                    <Nav.Link href="#pricing">Business</Nav.Link>
                    <NavDropdown title="More" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Entertainment</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Sports</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Weather</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Live TV</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <button className='btn btn-danger fw-bold mb-2 mb-lg-0 me-lg-2'><FaPlus /> Advertise</button>
                    {
                        user?.uid ?
                        <>
                            <OverlayTrigger
                                delay={{ hide: 400, show: 200 }}
                                overlay={(props) => (
                                <Tooltip {...props}>{user?.displayName}</Tooltip>
                                )}
                                placement="bottom"
                                ><Button variant="outline-primary mb-2 mb-lg-0 me-lg-2"><Image style={{width: '25px'}} roundedCircle src={user.photoURL} alt="img"></Image></Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                delay={{ hide: 400, show: 200 }}
                                overlay={(props) => (
                                <Tooltip {...props}>Logout</Tooltip>
                                )}
                                placement="bottom"
                                ><Button onClick={handleLogOut} variant='outline-primary mb-5 mb-lg-0'><FaSignOutAlt className='mb-1' /></Button>
                            </OverlayTrigger>
                        </>
                        :
                        <>
                            <OverlayTrigger
                                delay={{ hide: 400, show: 200 }}
                                overlay={(props) => (
                                <Tooltip {...props}>User</Tooltip>
                                )}
                                placement="bottom"
                                ><Button variant="outline-primary px-1 py-0 mb-2 mb-lg-0 me-lg-2"><FaUserCircle className='fs-5 m-2' /></Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                delay={{ hide: 400, show: 200 }}
                                overlay={(props) => (
                                <Tooltip {...props}>Login</Tooltip>
                                )}
                                placement="bottom"
                                ><Link to='/login' className='btn btn-outline-primary  mb-5 mb-lg-0'><FaSignInAlt className='mb-1' /></Link>
                            </OverlayTrigger>
                        </>
                    }
                </Nav>
                <div className='d-lg-none'>
                    <LeftSideNav></LeftSideNav>
                </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;