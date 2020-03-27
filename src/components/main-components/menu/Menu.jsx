import React from 'react';
import '../../../assets/styles/menu.css';
import { Navbar, Nav }from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { CustomNavItem } from './custom-nav-item/CustomNavItem'

export const Menu = () => {

    const pageOpenTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="menu-div">
            <div className="text-to-small-smartphone">Charts with data</div>
            <Navbar light expand="md">
                <Nav navbar>
                    <CustomNavItem
                        to={"/home"}
                        onClick={() => pageOpenTop}
                        tag={RRNavLink}
                        activeClassName={"active"}
                        itemName={"Home"}
                    />
                    <CustomNavItem
                        to={"/population-trend"}
                        onClick={() => pageOpenTop}
                        tag={RRNavLink}
                        activeClassName={"active"}
                        itemName={"Population trend"}
                    />
                    <CustomNavItem
                        to={"/currency-distribution"}
                        onClick={() => pageOpenTop}
                        tag={RRNavLink}
                        activeClassName={"active"}
                        itemName={"Currency distribution"}
                    />
                    <CustomNavItem
                        to={"/count-cities"}
                        onClick={() => pageOpenTop}
                        tag={RRNavLink}
                        activeClassName={"active"}
                        itemName={"Count cities"}
                    />
                </Nav>
            </Navbar>
        </div>
    )
}
