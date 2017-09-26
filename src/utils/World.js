import LocationCollection from './LocationCollection';
import * as Regions from '../regions';
import * as Dungeons from '../regions/dungeons';

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

    // Init regions
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

    // Init dungeons
    this.dungeons = [
      new Dungeons.EasternPalace(this),
    ];


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
            type: 'chest'
          });
        }
        return cloned;
      }, []);
      meta.loot = loot;
      return meta;
    });

    // Sort markers by Y value
    markers.sort((a, b) => a.coords [1] - b.coords[1]);

    return markers;
  }

  sortRequirements(requirements) {

    const sorted = [...requirements].sort((a, b) => {
      if (Array.isArray(a) && !Array.isArray(b)) return 1;
      if (!Array.isArray(a) && Array.isArray(b)) return -1;
      return 0;
    });
    return sorted;
  }

  getDungeonObjects() {
    return this.dungeons.map(dungeon => {
      return {
        name: dungeon.name,
        hash: dungeon.hash,
        coords: dungeon.coords,
        map: dungeon.map,
        layer: dungeon.layer,
      };
    });
  }
}
