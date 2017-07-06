// TODO: swordsInPool configuration

import Region from '../utils/Region';
import Location from '../utils/Location';
import LocationCollection from '../utils/LocationCollection';

export default class DarkWorldNorthEast extends Region {
  constructor(world) {
    super(world);
    this.name = 'North East Dark World';
    this.world = world;
    this.map = 'overworld';
    this.layer = 'darkworld';

    this.locations = new LocationCollection([
      new Location("Catfish", this, [81.5957, -18.9844]),
      new Location("Piece of Heart (Pyramid)", this, [70.1925, -75.6079]),
      new Location("Pyramid - Left", this, [67.7344, -95.6250]),
      new Location("Pyramid - Right", this, [67.7344, -95.6250]),
    ]);
  }

  setOwnRequirements() {
    this.setRequirements(
      [
        [ // or
          'defeatagahnim',
          [ // and
            'hammer',
            {id: 'gloves', value: 2},
            'moonpearl'
          ],
          [ // and
            {id: 'gloves', value: 2},
            'flippers',
            'moonpearl'
          ]
        ]
      ]
    );
  }

  initNoMajorGlitches() {

    this.locations.get("Catfish").setRequirements(
      [
        'moonpearl',
        {id: 'gloves', value: 2}
      ]
    );

    this.locations.get("Piece of Heart (Pyramid)").setRequirements(
      []
    );

    this.locations.get("Pyramid - Left").setRequirements(
      [
        'crystal5',
        'crystal6',
        'moonpearl',
        [ // or
          [ // and
            'hammer',
            ...this.world.getRegion('South Dark World').getRequirements()
          ],
          [ // and
            'mirror',
            'defeatagahnim'
          ]
        ]
      ]
    );

    this.locations.get("Pyramid - Right").setRequirements(
      [
        'crystal5',
        'crystal6',
        'moonpearl',
        [ // or
          [ // and
            'hammer',
            ...this.world.getRegion('South Dark World').getRequirements()
          ],
          [ // and
            'mirror',
            'defeatagahnim'
          ]
        ]
      ]
    );

    return this;
  }
}
