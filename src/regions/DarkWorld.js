import Region from '../utils/Region';
import Location from '../utils/Location';
import LocationCollection from '../utils/LocationCollection';

export default class DarkWorld extends Region {
  constructor(world) {
    super(world);
    this.name = 'Dark World';
    this.world = world;
    this.map = 'overworld';
    this.layer = 'darkworld';

    this.locations = new LocationCollection([
      new Location("[cave-055] Spike cave", this, [82.3382, -76.6187]),
			new Location("[cave-071] Misery Mire west area [left chest]", this, [34.3253, -172.9248]),
			new Location("[cave-071] Misery Mire west area [right chest]", this, [34.3253, -172.9248]),
			new Location("[cave-057-1F] Dark World Death Mountain - cave from top to bottom [top chest]", this, [84.0662, -25.3125]),
			new Location("[cave-057-1F] Dark World Death Mountain - cave from top to bottom [bottom chest]", this, [84.0662, -25.3125]),
			new Location("[cave-056] Dark World Death Mountain - cave under boulder [top right chest]", this, [84.0160, -30.2344]),
			new Location("[cave-056] Dark World Death Mountain - cave under boulder [top left chest]", this, [84.0160, -30.2344]),
			new Location("[cave-056] Dark World Death Mountain - cave under boulder [bottom left chest]", this, [84.0160, -30.2344]),
			new Location("[cave-056] Dark World Death Mountain - cave under boulder [bottom right chest]", this, [84.0160, -30.2344]),
    ]);
  }

  setOwnRequirements() {
    this.setRequirements([]);
  }

  initNoMajorGlitches() {
    this.locations.get("[cave-055] Spike cave").setRequirements(
      [
        'moonpearl',
        'hammer',
        ...this.world.getRegion('Death Mountain').getRequirements(),
      ]
		);

		this.locations.get("[cave-071] Misery Mire west area [left chest]").setRequirements(
      [
        'moonpearl',
        'flute',
        {id: 'gloves', value: 2}
      ]
		);

		this.locations.get("[cave-071] Misery Mire west area [right chest]").setRequirements(
      [
        'moonpearl',
        'flute',
        {id: 'gloves', value: 2},
      ]
		);

		this.locations.get("[cave-057-1F] Dark World Death Mountain - cave from top to bottom [top chest]").setRequirements(
      [
        ...this.world.getRegion('East Death Mountain').getRequirements(),
        {id: 'gloves', value: 2},
        'moonpearl',
      ]
		);

		this.locations.get("[cave-057-1F] Dark World Death Mountain - cave from top to bottom [bottom chest]").setRequirements(
      [
        ...this.world.getRegion('East Death Mountain').getRequirements(),
        {id: 'gloves', value: 2},
        'moonpearl',
      ]
		);

		this.locations.get("[cave-056] Dark World Death Mountain - cave under boulder [top right chest]").setRequirements(
      [
        ...this.world.getRegion('East Death Mountain').getRequirements(),
        'moonpearl',
        {id: 'gloves', value: 2},
        'hookshot',
      ]
		);

		this.locations.get("[cave-056] Dark World Death Mountain - cave under boulder [top left chest]").setRequirements(
      [
        ...this.world.getRegion('East Death Mountain').getRequirements(),
        'moonpearl',
        {id: 'gloves', value: 2},
        'hookshot'
      ]
		);

		this.locations.get("[cave-056] Dark World Death Mountain - cave under boulder [bottom left chest]").setRequirements(
      [
        ...this.world.getRegion('East Death Mountain').getRequirements(),
        'moonpearl',
        {id: 'gloves', value: 2},
        'hookshot',
      ]
		);

		this.locations.get("[cave-056] Dark World Death Mountain - cave under boulder [bottom right chest]").setRequirements(
      [
        'moonpearl',
        {id: 'gloves', value: 2},
        [ // or
          'hookshot',
          'boots',
        ],
        ...this.world.getRegion('East Death Mountain').getRequirements()
      ]
		);

		return this;
  }
}
