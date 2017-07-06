import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/mapActions';

import Loot from './Loot';

class LootMarker extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      openedChests: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.meetsRequirements = this.meetsRequirements.bind(this);
    this.meetsRequirement = this.meetsRequirement.bind(this);
    this.addListener = this.addListener.bind(this);

    this.openAll = this.openAll.bind(this);
    this.closeAny = this.closeAny.bind(this);
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

  handleClick() {
  }

  addListener(name, callback) {
    return this.props.overlay.addListener(name, callback);
  }

  meetsRequirement(requirement) {
    // is a basic item
    if (typeof requirement === 'string') {
      const item = this.props.tracker.items.find(item => item.id == requirement);
      return item.equipped;
    } else if (Array.isArray(requirement)) {
      // For OR conditions
      // Will return TRUE if ANY requirements are met
      // I should probably have done this differently
      return requirement.reduce((cur, req) => {
        if (cur) return cur;
        return this.meetsRequirement(req);
      }, false);
    } else {
      // is an upgradeable item
      const item = this.props.tracker.upgradeables.find(item => item.id == requirement.id);
      return requirement.value <= item.value;
    }
  }

  meetsRequirements(requirements) {
    if (requirements.length == 0) return true;
    let unmetRequirement = false;
    requirements.forEach(requirement => {
      if (!this.meetsRequirement(requirement)) unmetRequirement = true;
    });
    return !unmetRequirement;
  }

  requirementIcon(requirement) {
    const requirementMet = this.meetsRequirement(requirement);
    const classes = (requirementMet) ? 'icon equipped' : 'icon unequipped';
    // is a basic item
    if (typeof requirement === 'string') {
      return <img className={classes} src={`/icons/${requirement}.png`} />;
    } else {
      // is an upgradeable item
      const item = this.props.tracker.upgradeables.find(item => item.id == requirement.id);
      if (typeof item !== 'undefined') {
        return <img className={classes} src={`/icons/${item.icons[requirement.value]}.png`} />;
      }
    }
  }

  render() {
    const marker = this.props.map.markers[this.props.lootIndex];
    const loots = [...marker.loot];

    let classes = 'marker';

    if (this.props.map.mapTypeId == marker.layer) {
      classes += ' visible';
    } else {
      classes += ' hidden';
    }

    return (
      <div className={classes} onClick={this.handleClick}>
        <Loot
          loots={loots}
          tracker={this.props.tracker}
          addListener={this.addListener}
        />
      </div>
    );
  }
}


export default connect(
  state => ({
    tracker: state.itemTracker,
    map: state.map,
  }),
  dispatch => ({actions: bindActionCreators(actions, dispatch)})
)(LootMarker);
