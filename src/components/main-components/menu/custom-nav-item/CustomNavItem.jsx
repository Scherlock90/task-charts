import React from 'react';
import { NavItem, NavLink } from 'reactstrap';

export const CustomNavItem = ({ to, onClick, tag, activeClassName, itemName }) => (
    <NavItem>
        <NavLink {...{ to, onClick, tag, activeClassName }}>{ itemName }</NavLink>
    </NavItem>
)
