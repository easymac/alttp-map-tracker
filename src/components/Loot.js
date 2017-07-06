import React from 'react';
import LootRow from './LootRow';

class Loot extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const lootRows = this.props.loots.map((loot, i) => (
      <LootRow
        {...loot}
        tracker={this.props.tracker}
        addListener={this.props.addListener}
        key={i}
        keyProp={i}
      />
    ));
    return (
      <div className="loots">
        {lootRows}
      </div>
    );
  }
}

export default Loot;
