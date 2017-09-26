import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/home/HomePage';
import NotFoundPage from './components/NotFoundPage';
import MapContainer from './containers/MapContainer';
import OverworldMap from './components/OverworldMap';
import HyruleEscapeMap from './components/dungeons/HyruleEscapeMap';
import AgaTowerMap from './components/dungeons/AgaTowerMap';
import IcePalaceMap from './components/dungeons/IcePalaceMap';
import EasternPalaceMap from './components/dungeons/EasternPalaceMap';
import DesertPalaceMap from './components/dungeons/DesertPalaceMap';
import TowerOfHeraMap from './components/dungeons/TowerOfHeraMap';
import PalaceOfDarknessMap from './components/dungeons/PalaceOfDarknessMap';
import SwampPalaceMap from './components/dungeons/SwampPalaceMap';
import SkullWoodsMap from './components/dungeons/SkullWoodsMap';
import ThievesTownMap from './components/dungeons/ThievesTownMap';
import MiseryMireMap from './components/dungeons/MiseryMireMap';
import TurtleRockMap from './components/dungeons/TurtleRockMap';
import GanonsTowerMap from './components/dungeons/GanonsTowerMap';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="maps" component={MapContainer}>
      <IndexRoute component={OverworldMap} />
      <Route path="hyrule-escape" component={HyruleEscapeMap} />
      <Route path="aga-tower" component={AgaTowerMap} />
      <Route path="ice-palace" component={IcePalaceMap} />
      <Route path="eastern-palace" component={EasternPalaceMap} />
      <Route path="desert-palace" component={DesertPalaceMap} />
      <Route path="tower-of-hera" component={TowerOfHeraMap} />
      <Route path="palace-of-darkness" component={PalaceOfDarknessMap} />
      <Route path="swamp-palace" component={SwampPalaceMap} />
      <Route path="skull-woods" component={SkullWoodsMap} />
      <Route path="thieves-town" component={ThievesTownMap} />
      <Route path="misery-mire" component={MiseryMireMap} />
      <Route path="turtle-rock" component={TurtleRockMap} />
      <Route path="ganons-tower" component={GanonsTowerMap} />
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export const getRoutes = (store) => (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="maps" component={MapContainer}>
      <IndexRoute store={store} component={OverworldMap} />
      <Route path="hyrule-escape" component={HyruleEscapeMap} />
      <Route path="aga-tower" component={AgaTowerMap} />
      <Route path="ice-palace" component={IcePalaceMap} />
      <Route path="eastern-palace" component={EasternPalaceMap} />
      <Route path="desert-palace" component={DesertPalaceMap} />
      <Route path="tower-of-hera" component={TowerOfHeraMap} />
      <Route path="palace-of-darkness" component={PalaceOfDarknessMap} />
      <Route path="swamp-palace" component={SwampPalaceMap} />
      <Route path="skull-woods" component={SkullWoodsMap} />
      <Route path="thieves-town" component={ThievesTownMap} />
      <Route path="misery-mire" component={MiseryMireMap} />
      <Route path="turtle-rock" component={TurtleRockMap} />
      <Route path="ganons-tower" component={GanonsTowerMap} />
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
export default routes;
