import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

function Header() {
    return (
        <Navbar className="d-flex justify-content-center" color="danger" dark expand="md" >
            <NavbarBrand href="/" style={{ color: "#fff" }}>Movies App</NavbarBrand>
        </Navbar>
    )
}

export default Header;