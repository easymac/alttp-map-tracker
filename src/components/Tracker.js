import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrackerItem from './TrackerItem';
import TrackerUpgradeable from './TrackerUpgradeable';
import Timer from './Timer';
import * as actions from '../actions/itemTrackerActions';

import Image from './Image';

class Tracker extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.logoClickTest = this.logoClickTest.bind(this);
  }

  logoClickTest() {
  }

  render() {
    const active = [];
    const passive = [];
    const pendants = [];
    const crystals = [];
    const mystery = [];
    const aga = [];

    this.props.itemTracker.upgradeables.forEach((item, key) => {
      const el = (
        <TrackerUpgradeable
          item={item}
          key={`u-${key}`}
          upgradeItem={this.props.actions.upgradeItem}
          downgradeItem={this.props.actions.downgradeItem}
        />
      );
      if (item.type == 'active') active.push(el);
      if (item.type == 'passive') passive.push(el);
    });


    this.props.itemTracker.items.forEach((item, key) => {
      const el = (
        <TrackerItem
          item={item}
          key={`i-${key}`}
          equipItem={this.props.actions.equipItem}
        />
      );
      if (item.type == 'crystal') crystals.push(el);
      if (item.type == 'pendant') pendants.push(el);
      if (item.type == 'active') active.push(el);
      if (item.type == 'passive') passive.push(el);
      if (item.type == 'mystery') mystery.push(el);
      if (item.type == 'aga') aga.push(el);
    });
    return (
      <div id="tracker">
        <div className="logo" onClick={this.logoClickTest}>
          <Image src={`/logo.png`} />
        </div>
        <div id="item-tracker">
          {active}
          {passive}
          <div className="aga">
            {aga}
          </div>
          <div className="pendants">
            {pendants}
          </div>
          <div className="crystals">
            {crystals}
          </div>
        </div>
        <Timer />
      </div>
    );
  }
}

export default connect(
  state => ({
    itemTracker: state.itemTracker
  }),
  dispatch => ({actions: bindActionCreators(actions, dispatch)})
)(Tracker);
