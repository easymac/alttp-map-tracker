import React from 'react';
import Image from './Image';

import ChestCounter from './ChestCounter';
import Requirements from './Requirements';

class LootRow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openedChests: [],
    };

    this.openAll = this.openAll.bind(this);
    this.closeAny = this.closeAny.bind(this);
    this.hasItem = this.hasItem.bind(this);
    this.getIcon = this.getIcon.bind(this);
    this.meetsRequirements = this.meetsRequirements.bind(this);
  }

  openAll(lootIndex) {
    if (!this.state.openedChests.find(x => x == lootIndex)) {
      this.setState({openedChests: [...this.state.openedChests, lootIndex]});
    }
  }

  closeAny(lootIndex) {
    const i = this.state.openedChests.findIndex(x => x == lootIndex);
    if (i !== -1) {
      let newArr = [...this.state.openedChests];
      newArr.splice(i, 1);
      this.setState({openedChests: newArr});
    }
  }

  hasItem(item) {
    if (typeof item === 'string') {
      const trackedItem = this.props.tracker.items.find(i => i.id == item);
      if (typeof trackedItem !== 'undefined') return trackedItem.equipped;
    } else {
      const trackedItem = this.props.tracker.upgradeables.find(i => i.id == item.id);
      if (typeof trackedItem !== 'undefined') return trackedItem.value >= item.value;
    }
    return false;
  }

  meetsRequirementsAnd(requirements) {
    return requirements.reduce((result, requirement) => {
      // If any have returned false, return false.
      if (result == false) return false;

      // If the requirement is a string or object, return whether or not it has the item
      if (!Array.isArray(requirement)) return this.hasItem(requirement);

      // If the requirement is an Array, it is an OR requirement, recurse
      if (Array.isArray(requirement)) return this.meetsRequirementsOr(requirement);
    }, true);
  }

  meetsRequirementsOr(requirements) {
    return requirements.reduce((result, requirement) => {
      // If any have returned true, return true.
      if (result == true) return true;

      // If the requirement is a string or object, return whether or not it has the item
      if (!Array.isArray(requirement)) return this.hasItem(requirement);

      // If the requirement is an Array, it is an AND requirement, recurse
      if (Array.isArray(requirement)) return this.meetsRequirementsAnd(requirement);
    }, false);
  }

  meetsRequirements(requirements) {
    if (Array.isArray(requirements)) {
      return this.meetsRequirementsAnd(requirements);
    } else {
      return this.hasItem(requirements);
    }
  }

  getIcon() {
    let icon;
    if (this.props.type == 'chest') {
      icon = (
        <ChestCounter
          count={this.props.count}
          addListener={this.props.addListener}
          openAll={this.openAll}
          closeAny={this.closeAny}
          chestIndex={this.props.keyProp}
          key={this.props.keyProp}
        />
      );
    }
    if (this.props.type == 'warp') {
      icon = <Image className="icon" src={`/icons/warp.png`} />;
    }
    return icon;
  }

  render() {
    const meetsRequirements = this.meetsRequirements(this.props.requires);

    let chestClasses = (meetsRequirements) ? 'chests available' : 'chests unavailable';
    if (this.state.openedChests.find(c => c == this.props.keyProp)) {
      chestClasses = 'chests all-open';
    }
    return (
      <div className="loot-row">
        <div className={chestClasses}>
          {this.getIcon()}
        </div>
        <Requirements
          requires={this.props.requires}
          meetsRequirements={this.meetsRequirements}
          tracker={this.props.tracker}
        />
      </div>
    );
  }
}

export default LootRow;
