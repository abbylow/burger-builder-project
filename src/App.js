import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BugerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BugerBuilder/>
          <Checkout/>
        </Layout>
      </div>
    );
  }
}

export default App;
