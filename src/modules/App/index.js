import React, { PureComponent, Fragment } from 'react';
import Switch from 'react-router-dom/Switch';
import { Normalize } from 'styled-normalize'
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import moment from 'moment';
import 'moment/locale/de';

import Dashboard from '~/views/Dashboard';
import About from '~/pages/About';
import Imprint from '~/pages/Imprint';
import Navigation from '~/components/Navigation';

import GlobalStyle from './Style';

moment.locale('DE-de');

class AppWrapper extends PureComponent {
  render() {
    return (
      <BrowserRouter basename={BASENAME}>
        <Fragment>
          <Normalize />
          <GlobalStyle />
          <Navigation />

          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/ueber" component={About} />
            <Route path="/impressum" component={Imprint} />
            <Route render={() => <div>404 Error</div>} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default AppWrapper;
