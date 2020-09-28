import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
// import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Auth = React.lazy(() => import('./containers/Auth/Auth'));  //only default export is supported
const Orders = React.lazy(() => import('./containers/Orders/Orders'));  
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));  

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            {routes}
          </Suspense>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
