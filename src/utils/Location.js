/**
 * A loctaion is any place an item can be found in game
 */

export default class Location {
  constructor(name, region, coords, type='chest') {
    this.name = name;
    this.region = region;
    this.coords = coords;
    this.type = type;
    this.requirements = [];
  }

  setRequirements(arr) {
    this.requirements = [
      ...this.region.getRequirements(),
      ...arr,
    ];
  }
}
