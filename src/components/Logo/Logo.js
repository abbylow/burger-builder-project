import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png'; //import the image here so webpack will copy this image when compile to the production build and the generatd path will be valid when used below
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        {/* we cannot straight put the relative path here bcoz in production, the image path will be different */}
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);

export default logo;