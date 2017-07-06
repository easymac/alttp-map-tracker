import Region from '../utils/Region';
import Location from '../utils/Location';
import LocationCollection from '../utils/LocationCollection';

export default class DarkWorldSouth extends Region {
  constructor(world) {
    super(world);
    this.name = 'South Dark World';
    this.world = world;
    this.map = 'overworld';
    this.layer = 'darkworld';

    this.locations = new LocationCollection([
      new Location("[cave-073] cave northeast of swamp palace [top chest]", this, [37.4574, -72.4219]),
      new Location("[cave-073] cave northeast of swamp palace [top middle chest]", this, [37.4574, -72.4219]),
      new Location("[cave-073] cave northeast of swamp palace [bottom middle chest]", this, [37.4574, -72.4219]),
      new Location("[cave-073] cave northeast of swamp palace [bottom chest]", this, [37.4574, -72.4219]),
      new Location("Flute Boy", this, [50.0783, -124.4751]),
      new Location("[cave-073] cave northeast of swamp palace - generous guy", this, [37.4574, -72.4219]),
      new Location("Piece of Heart (Digging Game)", this, [48.8936, -169.8267]),
    ]);
  }

  setOwnRequirements() {
    this.setRequirements(
      [
        'moonpearl',
        [ // or
          [ // and
            ...this.world.getRegion('North East Dark World').getRequirements(),
            [ // or
              'hammer',
              [ // and
                'hookshot',
                [ // or
                  'flippers',
                  {id: 'gloves', value: 1}
                ]
              ]
            ]
          ],
          [ // and
            'hammer',
            {id: 'gloves', value: 1},
          ],
          {id: 'gloves', value: 2}
        ]
      ]
    );
  }

  initNoMajorGlitches() {

    this.locations.get("[cave-073] cave northeast of swamp palace [top chest]").setRequirements(
      []
    );

    this.locations.get("[cave-073] cave northeast of swamp palace [top middle chest]").setRequirements(
      []
    );

    this.locations.get("[cave-073] cave northeast of swamp palace [bottom middle chest]").setRequirements(
      []
    );

    this.locations.get("[cave-073] cave northeast of swamp palace [bottom chest]").setRequirements(
      []
    );

    this.locations.get("Flute Boy").setRequirements(
      []
    );

    this.locations.get("[cave-073] cave northeast of swamp palace - generous guy").setRequirements(
      []
    );

    this.locations.get("Piece of Heart (Digging Game)").setRequirements(
      []
    );

    return this;
  }
}
