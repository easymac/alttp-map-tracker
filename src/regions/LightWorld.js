import Region from '../utils/Region';
import Location from '../utils/Location';
import LocationCollection from '../utils/LocationCollection';

export default class LightWorld extends Region {
  constructor(world) {
    super(world);
    this.name = 'Light World';
    this.map = 'overworld';
    this.layer = 'lightworld';

    this.locations = new LocationCollection([
      new Location("Altar", this, [84.3, -172.67]),
      new Location("[cave-034] Hyrule Castle secret entrance", this, [72.0604, -72.7734]),
      new Location("[cave-018] Graveyard - top right grave", this, [77.6882, -71.7407]),
      new Location("[cave-047] Dam", this, [12.0393, -95.6250]),
      new Location("[cave-040] Link's House", this, [50.45, -81.5]),
      new Location("[cave-031] Tavern", this, [61.4493, -151.1279]),
      new Location("[cave-026] chicken house", this, [63.8407, -162.4438]),
      new Location("[cave-044] Aginah's cave", this, [30.8268, -144.1626]),
      new Location("[cave-035] Sahasrahla's Hut [left chest]", this, [69.8472, -34.1455]),
      new Location("[cave-035] Sahasrahla's Hut [center chest]", this, [69.8472, -34.1455]),
      new Location("[cave-035] Sahasrahla's Hut [right chest]", this, [69.8472, -34.1455]),
      new Location("[cave-021] Kakariko well [top chest]", this, [71.4271, -175.7592]),
      new Location("[cave-021] Kakariko well [left chest row of 3]", this, [71.4271, -175.7592]),
      new Location("[cave-021] Kakariko well [center chest row of 3]", this, [71.4271, -175.7592]),
      new Location("[cave-021] Kakariko well [right chest row of 3]", this, [71.4271, -175.7592]),
      new Location("[cave-021] Kakariko well [bottom chest]", this, [71.4271, -175.7592]),
      new Location("[cave-022-B1] Thief's hut [top chest]", this, [72.0468, -156.7968]),
      new Location("[cave-022-B1] Thief's hut [top left chest]", this, [72.0468, -156.7968]),
      new Location("[cave-022-B1] Thief's hut [top right chest]", this, [72.0468, -156.7968]),
      new Location("[cave-022-B1] Thief's hut [bottom left chest]", this, [72.0468, -156.7968]),
      new Location("[cave-022-B1] Thief's hut [bottom right chest]", this, [72.0468, -156.7968]),
      new Location("Blacksmiths", this, [64.3399, -125.1563]),
      new Location("[cave-016] cave under rocks west of Santuary", this, [77.7536, -109.7094]),
      new Location("[cave-050] cave southwest of Lake Hylia [bottom left chest]", this, [11.4585, -62.6001]),
      new Location("[cave-050] cave southwest of Lake Hylia [top left chest]", this, [11.4585, -62.6001]),
      new Location("[cave-050] cave southwest of Lake Hylia [top right chest]", this, [11.4585, -62.6001]),
      new Location("[cave-050] cave southwest of Lake Hylia [bottom right chest]", this, [11.4585, -62.6001]),
      new Location("[cave-051] Ice Cave", this, [38.5482, -18.9844]),
      new Location("Bottle Vendor", this, [69.3015, -162.7954]),
      new Location("Sahasrahla", this, [69.8472, -34.1455]),
      new Location("Magic Bat", this, [62.1963, -121.6406]),
      new Location("Sick Kid", this, [64.0914, -151.8530]),
      new Location("Purple Chest", this, [19.3111, -118.4546]),
      new Location("Hobo", this, [47.7541, -52.2949]),
      new Location("Bombos Tablet", this, [15.3478, -140.6250]),
      new Location("King Zora", this, [82.6398, -7.4268]),
      new Location("Piece of Heart (Thieves' Forest Hideout)", this, [82.5377, -145.8984]),
      new Location("Piece of Heart (Lumberjack Tree)", this, [83.8346, -125.8374]),
      new Location("Piece of Heart (south of Haunted Grove)", this, [30.6946, -132.1875]),
      new Location("Piece of Heart (Graveyard)", this, [78.4730, -77.3218]),
      new Location("Piece of Heart (Desert - northeast corner)", this, [37.8402, -148.3594]),
      new Location("[cave-050] cave southwest of Lake Hylia - generous guy", this, [11.4585, -62.6001]),
      new Location("Library", this, [52.9751, -151.8530]),
      new Location("Mushroom", this, [83.6088, -158.5546]),
      new Location("Witch", this, [76.1430, -35.8594]),
      new Location("Piece of Heart (Maze Race)", this, [47.4983, -174.7166]),
      new Location("Piece of Heart (Desert - west side)", this, [15.4537, -175.4297]),
      new Location("Piece of Heart (Lake Hylia)", this, [30.3350, -49.5703]),
      new Location("Piece of Heart (Dam)", this, [12.7047, -98.0859]),
      new Location("Piece of Heart (Zora's River)", this, [82.6398, -7.4268]),
      new Location("Haunted Grove item", this, [52.2682, -128.3423]),
    ]);
  }

  setOwnRequirements() {
    // Light World Requirements
    this.setRequirements([]);
  }

  initNoMajorGlitches() {

    this.locations.get("Altar").setRequirements(
      [
        'bluependant',
        'redpendant',
        'greenpendant'
      ]
    );

    this.locations.get("[cave-018] Graveyard - top right grave").setRequirements(
      [
        [ // or
          [ // and
            ...this.world.getRegion('North West Dark World').getRequirements(),
            'mirror',
          ],
          [ // and
            {id: 'gloves', value: 2},
          ]
        ],
        'boots',
      ]
    );

    this.locations.get("[cave-040] Link's House").setRequirements(
      []
    );

    this.locations.get("Blacksmiths").setRequirements(
        [
          {id: 'gloves', value: 2},
          ...this.world.getRegion('North West Dark World').getRequirements()
        ]
    );

    this.locations.get("[cave-016] cave under rocks west of Santuary").setRequirements(
      ['boots']
    );

    this.locations.get("Sahasrahla").setRequirements(
      ['greenpendant']
    );

    this.locations.get("Magic Bat").setRequirements(
      [
        'powder',
        [ // or
          'hammer',
          [ // and
            'moonpearl',
            'mirror',
            {id: 'gloves', value: 2}
          ]
        ]
      ]
    );

    this.locations.get("Sick Kid").setRequirements(
      [
        {id: 'bottle', value: 1}
      ]
    );

    this.locations.get("Purple Chest").setRequirements(
      [
        {id: 'gloves', value: 2},
        'moonpearl',
        ...this.world.getRegion('North West Dark World').getRequirements()
      ]
    );

    this.locations.get("Hobo").setRequirements(
      ['flippers']
    );

    this.locations.get("Bombos Tablet").setRequirements(
      [
        'book',
        {id: 'sword', value: 2},
        ...this.world.getRegion('South Dark World').getRequirements(),
        'mirror'
      ]
    );

    this.locations.get("King Zora").setRequirements(
      [
        [ // or
          {id: 'gloves', value: 1},
          'flippers'
        ]
      ]
    );

    this.locations.get("Piece of Heart (Lumberjack Tree)").setRequirements(
      [
        'defeatagahnim',
        'boots'
      ]
    );

    this.locations.get("Piece of Heart (south of Haunted Grove)").setRequirements(
      [
        ...this.world.getRegion('South Dark World').getRequirements(),
        'mirror',
      ]
    );

    this.locations.get("Piece of Heart (Graveyard)").setRequirements(
      [
        ...this.world.getRegion('North West Dark World').getRequirements(),
        'mirror',
      ]
    );

    this.locations.get("Piece of Heart (Desert - northeast corner)").setRequirements(
      [
        'flute',
        {id: 'gloves', value: 2},
        'mirror'
      ]
    );

    this.locations.get("Library").setRequirements(
      ['boots']
    );

    this.locations.get("Witch").setRequirements(
      ['mushroom']
    );

    this.locations.get("Piece of Heart (Desert - west side)").setRequirements(
      [
        [ // or
          'book',
          [ //and
            'mirror',
            {id: 'gloves', value: 2},
            'flute'
          ]
        ]
      ]
    );

    this.locations.get("Piece of Heart (Lake Hylia)").setRequirements(
      [
        'flippers',
        'moonpearl',
        'mirror',
        [ // or
          this.world.getRegion('South Dark World').getRequirements(),
          this.world.getRegion('North East Dark World').getRequirements()
        ]
      ]
    );

    this.locations.get("Piece of Heart (Zora's River)").setRequirements(
      ['flippers']
    );

    this.locations.get("Haunted Grove item").setRequirements(
      ['shovel']
    );

    return this;
  }
}
