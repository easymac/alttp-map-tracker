export default class Region {

  constructor(world) {
    this.world = world;
    this.requirements = [];
  }

  init() {
    // TODO: implement more logics
    this.initNoMajorGlitches();
  }

  initNoMajorGlitches() {
    return this;
  }

  setRequirements(req) {
    this.requirements = req;
  }

  getRequirements() {
    return this.requirements;
  }
}
