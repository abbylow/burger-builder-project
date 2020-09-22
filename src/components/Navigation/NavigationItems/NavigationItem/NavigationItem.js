import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active} //need to do this bcoz classname will be unique hashed
        >
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;