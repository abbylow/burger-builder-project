import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {/* active is a boolean value, so can assign true just as below instead of active={true} */}
        <NavigationItem link="/" exact>
            Burger Builder
        </NavigationItem>
        {props.isAuth ?
            <NavigationItem link="/orders">Orders</NavigationItem>
            : null}
        {props.isAuth ?
            <NavigationItem link="/logout">Logout</NavigationItem>
            : <NavigationItem link="/auth">Auth</NavigationItem>
        }
    </ul>
);

export default navigationItems;