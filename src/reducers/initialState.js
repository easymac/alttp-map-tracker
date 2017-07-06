import World from '../utils/World';

const world = new World();

export default {
  map: {
    mapTypeId: 'lightworld',
    markers: [...world.getLocationsAsLootObjects()]
  },
  tracker: {
    items: [
      {
        id: 'bomb',
        name: 'Bombs',
        equipped: false,
        type: 'active',
      },
      {
        id: 'shovel',
        name: 'Shovel',
        equipped: false,
        type: 'active',
      },
      {
        id: 'flute',
        name: 'flute',
        equipped: false,
        type: 'active',
      },
      {
        id: 'icerod',
        name: 'Ice Rod',
        equipped: false,
        type: 'active',
      },
      {
        id: 'firerod',
        name: 'Fire Rod',
        equipped: false,
        type: 'active',
      },
      {
        id: 'bombos',
        name: 'Bombos Medallion',
        equipped: false,
        type: 'active',
      },
      {
        id: 'quake',
        name: 'Quake Medallion',
        equipped: false,
        type: 'active',
      },
      {
        id: 'ether',
        name: 'Ether Medallion',
        equipped: false,
        type: 'active',
      },
      {
        id: 'hookshot',
        name: 'Hookshot',
        equipped: false,
        type: 'active',
      },
      {
        id: 'cape',
        name: 'Magic Cape',
        equipped: false,
        type: 'active',
      },
      {
        id: 'somaria',
        name: 'Cane of Somaria',
        equipped: false,
        type: 'active',
      },
      {
        id: 'byrna',
        name: 'Cane of Byrna',
        equipped: false,
        type: 'active',
      },
      {
        id: 'hammer',
        name: 'Magic Hammer',
        equipped: false,
        type: 'active',
      },
      {
        id: 'lamp',
        name: 'lamp',
        equipped: false,
        type: 'active',
      },
      {
        id: 'mushroom',
        name: 'Mushroom',
        equipped: false,
        type: 'active',
      },
      {
        id: 'powder',
        name: 'Magic Powder',
        equipped: false,
        type: 'active',
      },
      {
        id: 'mirror',
        name: 'Magic Mirror',
        equipped: false,
        type: 'active',
      },
      {
        id: 'net',
        name: 'Bug-Catching Net',
        equipped: false,
        type: 'active',
      },
      {
        id: 'book',
        name: 'Book of Mudora',
        equipped: false,
        type: 'active',
      },
      {
        id: 'boots',
        name: 'Pegasus Boots',
        equipped: false,
        type: 'passive',
      },
      {
        id: 'flippers',
        name: 'Zora\'s Flippers',
        equipped: false,
        type: 'passive',
      },
      {
        id: 'moonpearl',
        name: 'Moon Pearl',
        equipped: false,
        type: 'passive',
      },
      {
        id: 'mystery1',
        name: 'Misery Mire Medallion',
        equipped: false,
        type: 'mystery',
      },
      {
        id: 'mystery2',
        name: 'Turtle Rock Medallion',
        equipped: false,
        type: 'mystery',
      },
      {
        id: 'greenpendant',
        name: 'Pendant of Courage',
        equipped: false,
        type: 'pendant',
      },
      {
        id: 'bluependant',
        name: 'Pendant of Power',
        equipped: false,
        type: 'pendant',
      },
      {
        id: 'redpendant',
        name: 'Pendant of Wisdom',
        equipped: false,
        type: 'pendant',
      },
      {
        id: 'defeatagahnim',
        name: 'Defeat Agahnim',
        equipped: false,
        type: 'aga'
      },
      {
        id: 'crystal1',
        name: 'Crystal 1',
        equipped: false,
        type: 'crystal',
      },
      {
        id: 'crystal2',
        name: 'Crystal 2',
        equipped: false,
        type: 'crystal',
      },
      {
        id: 'crystal3',
        name: 'Crystal 3',
        equipped: false,
        type: 'crystal',
      },
      {
        id: 'crystal4',
        name: 'Crystal 4',
        equipped: false,
        type: 'crystal',
      },
      {
        id: 'crystal5',
        name: 'Crystal 5',
        equipped: false,
        type: 'crystal',
      },
      {
        id: 'crystal6',
        name: 'Crystal 6',
        equipped: false,
        type: 'crystal',
      },
      {
        id: 'crystal7',
        name: 'Crystal 7',
        equipped: false,
        type: 'crystal',
      },
    ],
    upgradeables: [
      {
        id: 'bow',
        value: 0,
        mandatory: false,
        names: ['Bow', 'Silver Arrows'],
        icons: ['bowempty', 'bow', 'silverbow'],
        type: 'active',
      },
      {
        id: 'boomerang',
        value: 0,
        mandatory: false,
        names: ['Boomerang', 'Magic Boomerang'],
        icons: ['magicboomerang', 'boomerang', 'magicboomerang'],
        type: 'active',
      },
      {
        id: 'bottle',
        value: 0,
        mandatory: false,
        names: ['1 Bottle', '2 Bottles', '3 Bottles', '4 Bottles'],
        icons: ['bottle', 'bottle-1', 'bottle-2', 'bottle-3', 'bottle-4'],
        type: 'active',
      },
      {
        id: 'sword',
        value: 0,
        mandatory: false,
        names: ['Fighter\'s Sword', 'Master Sword', 'Tempered Sword', 'Golden Sword'],
        icons: ['nosword', 'fighterssword', 'mastersword', 'temperedsword', 'goldensword'],
        type: 'passive',
      },
      {
        id: 'shield',
        value: 0,
        mandatory: false,
        names: ['Small Shield', 'Fire Shield', 'Mirror Shield'],
        icons: ['smallshield', 'smallshield', 'fireshield', 'mirrorshield'],
        type: 'passive',
      },
      {
        id: 'mail',
        value: 1,
        mandatory: true,
        names: ['Green Mail', 'Blue Mail', 'Red Mail'],
        icons: ['', 'greenmail', 'bluemail', 'redmail'],
        type: 'passive',
      },
      {
        id: 'gloves',
        value: 0,
        mandatory: false,
        names: ['Power Glove', 'Titan\'s Mitt'],
        icons: ['titansmitt', 'powerglove', 'titansmitt'],
        type: 'passive',
      }
    ]
  }
};
