import React from 'react';

import classes from './NavigationItems.css'; 
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {/* active is a boolean value, so can assign true just as below instead of active={true} */}
        <NavigationItem link="/" exact> 
            Burger Builder
        </NavigationItem>
        <NavigationItem link="/orders">
            Orders
        </NavigationItem>
        <NavigationItem link="/auth">
            Auth
        </NavigationItem>
    </ul>
);

export default navigationItems;