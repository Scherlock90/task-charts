import React from 'react';
import '../../../assets/styles/menu.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { CustomNavItem } from './custom-nav-item/CustomNavItem'

export class Menu extends React.Component {
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
                <div className="text-to-small-smartphone">Charts with data</div>
                <Navbar light expand="md">
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar >
                        <Nav navbar>
                            <CustomNavItem
                                to={"/home"}
                                onClick={() => this.pageOpenTop()}
                                tag={RRNavLink}
                                activeClassName={"active"}
                                itemName={"Home"}
                            />
                            <CustomNavItem
                                to={"/population-trend"}
                                onClick={() => this.pageOpenTop()}
                                tag={RRNavLink}
                                activeClassName={"active"}
                                itemName={"Population trend"}
                            />
                            <CustomNavItem
                                to={"/currency-distribution"}
                                onClick={() => this.pageOpenTop()}
                                tag={RRNavLink}
                                activeClassName={"active"}
                                itemName={"Currency distribution"}
                            />
                            <CustomNavItem
                                to={"/count-cities"}
                                onClick={() => this.pageOpenTop()}
                                tag={RRNavLink}
                                activeClassName={"active"}
                                itemName={"Count cities"}
                            />
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
