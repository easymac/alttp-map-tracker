export default class LocationCollection {
  constructor(locations) {
    this.locations = locations || [];
  }

  get(name) {
    return this.locations.find(loc => loc.name == name);
  }

  add(locations) {
    this.locations = [...this.locations, ...locations];
  }

  getAll() {
    return this.locations;
  }
}
