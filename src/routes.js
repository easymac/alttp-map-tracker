import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import MapContainer from './containers/MapContainer';
import OverworldMap from './components/OverworldMap';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="maps" component={MapContainer}>
      <IndexRoute component={OverworldMap} />
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export const getRoutes = (store) => (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="maps" component={MapContainer}>
      <IndexRoute store={store} component={OverworldMap} />
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
export default routes;
