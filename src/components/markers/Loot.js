import React from 'react';

import ChestCounter from './ChestCounter';
import Requirements from './Requirements';

class Loot extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      status: '',
      hover: false,
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.hasItem = this.hasItem.bind(this);
    this.getIcon = this.getIcon.bind(this);
    this.meetsRequirements = this.meetsRequirements.bind(this);
    this.meetsRequirementsAnd = this.meetsRequirementsAnd.bind(this);
    this.meetsRequirementsOr = this.meetsRequirementsOr.bind(this);
  }

  handleMouseEnter() {
    this.setState({hover: true});
  }

  handleMouseLeave() {
    this.setState({hover: false});
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

  setStatus(status) {
    this.setState({status});
  }

  getIcon() {
    let icon;
    if (this.props.data.type == 'chest') {
      icon = (
        <ChestCounter
          count={this.props.data.count}
          addListener={this.props.addListener}
          setStatus={this.setStatus}
          chestIndex={this.props.keyProp}
          key={this.props.keyProp}
        />
      );
    }
    if (this.props.data.type == 'warp') {
      icon = <Image className="icon" src={`/icons/warp.png`} />;
    }
    return icon;
  }

  getRequirementsPane() {
    return (
      <Requirements
        requirements={this.props.data.requires}
        meetsRequirements={this.meetsRequirements}
        meetsRequirementsOr={this.meetsRequirementsOr}
        meetsRequirementsAnd={this.meetsRequirementsAnd}
        tracker={this.props.tracker}
      />
    );
  }

  render() {
    const classes = ['nu-loot'];
    if (this.state.status.length) classes.push(this.state.status);
    if (this.meetsRequirements(this.props.data.requires)) classes.push('available');

    const icon = this.getIcon();
    return (
      <div
        className={classes.join(' ')}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {icon}
        {!this.state.hover ? '' : this.getRequirementsPane()}
      </div>
    );
  }
}

export default Loot;
