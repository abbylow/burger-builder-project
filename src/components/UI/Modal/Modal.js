import React, { Fragment } from 'react';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.css';

const modal = props => {
    // actually can be a functional component and use React.memo
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== props.show || nextProps.children !== props.children
    // }

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Fragment>
    )
}

// use React.memo to replace shouldComponentUpdate
// second argument (optional) is to determine whether it is same 
export default React.memo(modal, (prevProps, nextProps) =>
    nextProps.show === prevProps.show && 
    nextProps.children === prevProps.children
);