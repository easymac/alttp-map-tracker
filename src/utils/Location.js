/**
 * A loctaion is any place an item can be found in game
 */

export default class Location {
  constructor(name, region, coords) {
    this.name = name;
    this.region = region;
    this.coords = coords;
    this.requirements = [];
  }

  setRequirements(arr) {
    this.requirements = [
      ...this.region.getRequirements(),
      ...arr,
    ];
  }
}
