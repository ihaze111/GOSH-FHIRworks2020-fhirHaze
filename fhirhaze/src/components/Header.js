import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


function Header(){
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">
                <img
                  alt=""
                  src="./fire.png"
                  width="20"
                  height="32"
                  className="d-inline-block align-top"
                />{' '}
                fhirHaze
                </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic=navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/About">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;