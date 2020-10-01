import React, { Fragment, useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapperComponent, axios) => {
    // anonymous class because never call the name
    return props => {
        const [error, setError] = useState(null);

        // componentWillMount: just put in this place instead of inside a useEffect hook
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null); //clear the error when sending request
            return req;
        });

        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <Fragment>
                <Modal
                    show={error}
                    modalClosed={errorConfirmedHandler}
                >
                    {error ? error.message : null}
                </Modal>
                <WrapperComponent {...props} />
            </Fragment>
        )
    }
}

export default withErrorHandler;