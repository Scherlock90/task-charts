import React from 'react';
import '../../Styles/menu.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }
    pageOpenTop = () => {
        window.scrollTo(0, 0);
    };
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <div className="menu-div">
                <div className="text-to-small-smartphone">
                    Charts with data
                </div>
                <Navbar 
                    light 
                    expand="md"
                >
                    <NavbarToggler
                        onClick={this.toggleNavbar}
                        className="mr-2"
                    />
                    <Collapse 
                        isOpen={!this.state.collapsed} 
                        navbar
                    >
                        <Nav navbar>
                            <NavItem>
                                <NavLink
                                    to="/home"
                                    activeClassName="active"
                                    tag={RRNavLink}
                                    onClick={() => this.pageOpenTop()}
                                >
                                    Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to="/population-trend"
                                    activeClassName="active"
                                    tag={RRNavLink}
                                    onClick={() => this.pageOpenTop()}
                                >
                                    Population trend
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to="/currency-distribution"
                                    activeClassName="active"
                                    tag={RRNavLink}
                                    onClick={() => this.pageOpenTop()}
                                >
                                    Currency distribution
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to="/count-cities"
                                    activeClassName="active"
                                    tag={RRNavLink}
                                    onClick={() => this.pageOpenTop()}
                                >
                                    Count cities
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}