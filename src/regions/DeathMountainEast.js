import Region from '../utils/Region';
import Location from '../utils/Location';
import LocationCollection from '../utils/LocationCollection';

export default class DeathMountainEast extends Region {
  constructor(world) {
    super(world);
    this.name = 'East Death Mountain';
    this.map = 'overworld';
    this.layer = 'lightworld';

    this.locations = new LocationCollection([
      new Location("[cave-012-1F] Death Mountain - wall of caves - left cave", this, [83.5375, -36.6064]),
      new Location("[cave-013] Mimic cave (from Turtle Rock)", this, [83.5251, -28.1470]),
      new Location("[cave-009-1F] Death Mountain - wall of caves - right cave [top left chest]", this, [80.4047, -24.6094]),
      new Location("[cave-009-1F] Death Mountain - wall of caves - right cave [top left middle chest]", this, [80.4047, -24.6094]),
      new Location("[cave-009-1F] Death Mountain - wall of caves - right cave [top right middle chest]", this, [80.4047, -24.6094]),
      new Location("[cave-009-1F] Death Mountain - wall of caves - right cave [top right chest]", this, [80.4047, -24.6094]),
      new Location("[cave-009-1F] Death Mountain - wall of caves - right cave [bottom chest]", this, [80.4047, -24.6094]),
      new Location("[cave-009-B1] Death Mountain - wall of caves - right cave [left chest]", this, [80.4047, -24.6094]),
      new Location("[cave-009-B1] Death Mountain - wall of caves - right cave [right chest]", this, [80.4047, -24.6094]),
      new Location("Piece of Heart (Death Mountain - floating island)", this, [84.8756, -34.0796]),
      // Warps
      new Location("East Death Mountain Warp", this, [79.9742, -41.1328], 'warp'),
      new Location("Turtle Rock Warp", this, [84.1497, -10.9204], 'warp'),
    ]);
  }

  setOwnRequirements() {
    this.setRequirements(
      [
        ...this.world.getRegion('Death Mountain').getRequirements(),
        [ // or
          [ // and
            'hammer',
            'mirror',
          ],
          'hookshot'
        ]
      ]
    );
  }

  initNoMajorGlitches() {

    this.locations.get("[cave-012-1F] Death Mountain - wall of caves - left cave").setRequirements(
      []
    );

    this.locations.get("[cave-013] Mimic cave (from Turtle Rock)").setRequirements(
      [
        'hammer',
        'moonpearl',
        'somaria',
      ]
    );

    this.locations.get("[cave-009-1F] Death Mountain - wall of caves - right cave [top left chest]").setRequirements(
      []
    );

    this.locations.get("[cave-009-1F] Death Mountain - wall of caves - right cave [top left middle chest]").setRequirements(
      []
    );

    this.locations.get("[cave-009-1F] Death Mountain - wall of caves - right cave [top right middle chest]").setRequirements(
      []
    );

    this.locations.get("[cave-009-1F] Death Mountain - wall of caves - right cave [top right chest]").setRequirements(
      []
    );

    this.locations.get("[cave-009-1F] Death Mountain - wall of caves - right cave [bottom chest]").setRequirements(
      []
    );

    this.locations.get("[cave-009-B1] Death Mountain - wall of caves - right cave [left chest]").setRequirements(
      []
    );

    this.locations.get("[cave-009-B1] Death Mountain - wall of caves - right cave [right chest]").setRequirements(
      []
    );

    this.locations.get("Piece of Heart (Death Mountain - floating island)").setRequirements(
      [
        'mirror',
        'moonpearl',
        {id: 'gloves', value: 2}
      ]
    );

    //Warps
    this.locations.get("East Death Mountain Warp").setRequirements(
      [
        {id: 'gloves', value: 2}
      ]
    );

    this.locations.get("Turtle Rock Warp").setRequirements(
      [
        'hammer',
        {id: 'gloves', value: 2}
      ]
    );

    return this;
  }
}
