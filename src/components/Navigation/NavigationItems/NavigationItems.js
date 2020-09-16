import React from 'react';

import classes from './NavigationItems.css'; 
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {/* active is a boolean value, so can assign true just as below instead of active={true} */}
        <NavigationItem link="/" active> 
            Burger Builder
        </NavigationItem>
        <NavigationItem link="/">
            Checkout
        </NavigationItem>
    </ul>
);

export default navigationItems;