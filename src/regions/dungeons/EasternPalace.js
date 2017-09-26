import Region from '../../utils/Region';
import LocationCollection from '../../utils/LocationCollection';

export default class EasternPalace extends Region {
  constructor(world) {
    super(world);
    this.name = 'Eastern Palace';
    this.hash = 'eastern-palace';
    this.coords = [73.6340, -7.3828];
    this.map = 'overworld';
    this.layer = 'lightworld';

    this.locations = new LocationCollection();
  }
}
