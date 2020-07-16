import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Routes from './Routes';
import * as Routers from './Routers';
import configureStore from '../Store/configureStore';
import initialState from '../Store/InitialState.config';
import BlankLayout from './page.layout'
import Loader from '../utils/Loader/Loader'




function RouteWithLayout({ layout, component, ...rest }) {
    return (
      <Route {...rest} render={(props) =>
        React.createElement(layout, props, React.createElement(component, props))
      } />
    );
  }
  const AppRouter = () => (
    <Provider store={configureStore({ initialState })}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            {/* withOut Layout */}
            <RouteWithLayout exact layout={BlankLayout} path={Routes.LOGIN} component={Routers.Login} />
            <RouteWithLayout exact layout={BlankLayout} path={Routes.LAYOUT} component={Routers.Layout} />
            
            {/* with Layout */}
            <RouteWithLayout exact layout={DashboardLayout} path={Routes.DASHBOARD} component={Routers.DashboardPage} />
          
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  )

export default AppRouter;
  