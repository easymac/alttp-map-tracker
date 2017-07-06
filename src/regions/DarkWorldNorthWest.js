import Region from '../utils/Region';
import Location from '../utils/Location';
import LocationCollection from '../utils/LocationCollection';

export default class DarkWorldNorthWest extends Region {
  constructor(world) {
    super(world);
    this.name = 'North West Dark World';
    this.world = world;
    this.map = 'overworld';
    this.layer = 'darkworld';

    this.locations = new LocationCollection([
      new Location("[cave-063] doorless hut", this, [60.0429, -160.3345]),
      new Location("[cave-062] C-shaped house", this, [68.0897, -142.7344]),
      new Location("Piece of Heart (Treasure Chest Game)", this, [69.0764, -170.8594]),
      new Location("Piece of Heart (Dark World blacksmith pegs)", this, [58.1591, -123.0688]),
      new Location("Piece of Heart (Dark World - bumper cave)", this, [81.9448, -117.7734]),
    ]);
  }

  setOwnRequirements() {
    this.setRequirements([
      [ // or
        [ // and
          ...this.world.getRegion('North East Dark World').getRequirements,
          [ // or
            [ // and
              'hookshot',
              [ // or
                'hammer',
                {id: 'gloves', value: 1},
                'flippers'
              ]
            ]
          ]
        ],
        [ // and
          'hammer',
          {id: 'gloves', value: 1},
        ],
        {id: 'gloves', value: 2}
      ],
      'moonpearl'
    ]);
  }

  initNoMajorGlitches() {

    this.locations.get("[cave-063] doorless hut").setRequirements(
			[]
		);

		this.locations.get("[cave-062] C-shaped house").setRequirements(
			[]
		);

		this.locations.get("Piece of Heart (Treasure Chest Game)").setRequirements(
			[]
		);

		this.locations.get("Piece of Heart (Dark World blacksmith pegs)").setRequirements(
			[
        {id: 'gloves', value: 2},
        'hammer'
      ]
		);

		this.locations.get("Piece of Heart (Dark World - bumper cave)").setRequirements(
			[
        {id: 'gloves', value: 2},
        'cape'
      ]
		);

		return this;
  }
}
