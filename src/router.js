import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ProductPage from './routes/ProductPage'
import App from './routes/App'
import App2 from './routes/App2'


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <App2>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/product" exact component={ProductPage} />
        </Switch>
     </App2>
     
    </Router>
  );
}

export default RouterConfig;
