import Region from '../utils/Region';
import Location from '../utils/Location';
import LocationCollection from '../utils/LocationCollection';

export default class DeathMountain extends Region {
  constructor(world) {
    super(world);
    this.name = 'Death Mountain';
    this.map = 'overworld';
    this.layer = 'lightworld';

    this.locations = new LocationCollection([
      new Location("Ether Tablet", this, [84.8874, -104.4141]),
      new Location("Old Mountain Man", this, [81.2350, -106.8530]),
      new Location("Piece of Heart (Spectacle Rock Cave)", this, [82.3118, -92.1313]),
      new Location("Piece of Heart (Spectacle Rock)", this, [83.5276, -88.2422]),
    ]);
  }

  setOwnRequirements() {
    this.setRequirements([
      [ // or
        'flute',
        [ // and
          {id: 'gloves', value: 1},
          'lamp'
        ]
      ]
    ]);
  }

  initNoMajorGlitches() {

    this.locations.get("Ether Tablet").setRequirements(
      [
        'book',
        {id: 'sword', value: 2},
        [ // or
          'mirror',
          [
            'hammer',
            ...this.world.getRegion('East Death Mountain').getRequirements()
          ]
        ]
      ]
		);

		this.locations.get("Old Mountain Man").setRequirements(
			['lamp']
		);

		this.locations.get("Piece of Heart (Spectacle Rock Cave)").setRequirements(
			[]
		);

		this.locations.get("Piece of Heart (Spectacle Rock)").setRequirements(
			['mirror']
		);

		return this;
  }
}
