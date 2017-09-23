import LocationCollection from './LocationCollection';
import * as Regions from '../regions';

import arraysEqual from './ArrayUtils';

/**
 * This is the container for all the regions and locations one can find items in the game.
 */
export default class World {

  /**
   * Create a new world and initialize all of the Regions within it
   */
  constructor() {
    // TODO: implement more logics
    this.logic = 'NoMajorGlitches';

    this.regions = [
      new Regions.LightWorld(this),
      new Regions.DeathMountain(this),
      new Regions.DeathMountainEast(this),
      new Regions.DarkWorld(this),
      new Regions.DarkWorldNorthWest(this),
      new Regions.DarkWorldSouth(this),
      new Regions.DarkWorldNorthEast(this),
    ];

    this.locations = new LocationCollection();

    this.regions.forEach(region => {
      region.setOwnRequirements();
    });

    this.regions.forEach(region => {
      region.init(this.logic);
      this.locations.add(region.locations.getAll());
    });
  }

  getRegion(name) {
    return this.regions.find(region => region.name == name);
  }

  combineLocationsByCoords() {
    const locations = this.locations.getAll();
    const searchedCoords = [];
    const coordPools = [];

    locations.forEach(location => {
      if (!searchedCoords.find(coords => arraysEqual(coords, location.coords))) {
        coordPools.push(locations.filter(loc => arraysEqual(loc.coords, location.coords)));
        searchedCoords.push(location.coords);
      }
    });

    return coordPools;
  }

  getLocationsAsLootObjects() {
    const combinedLocations = this.combineLocationsByCoords();

    const markers = combinedLocations.map(locationArray => {
      const details = locationArray[0];
      const meta = {
        name: details.name,
        region: details.region.name,
        map: details.region.map,
        layer: details.region.layer,
        coords: details.coords,
      };
      const loot = locationArray.reduce((acc, curr) => {
        const cloned = [...acc];
        const sameRequirements = acc.findIndex(loc => arraysEqual(loc.requires, curr.requirements));
        if (sameRequirements != -1) {
          cloned[sameRequirements].count++;
        } else {
          cloned.push({
            count: 1,
            requires: curr.requirements,
            type: curr.type
          });
        }
        return cloned;
      }, []); 
      meta.loot = loot;
      return meta;
    });

    return markers;
  }
}
