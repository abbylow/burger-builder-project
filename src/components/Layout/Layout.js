import React from 'react';
import classes from './Layout.css';

const layout = (props) => (
    <React.Fragment>
        <div>TOOLBAR, SIDE DRAWER, BACKDROPS</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </React.Fragment>
)

export default layout;