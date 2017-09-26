import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/mapActions';

import Loot from './Loot';

class LootMarker extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    };

    this.handleClick = this.handleClick.bind(this);
    this.addListener = this.addListener.bind(this);
    this.marker = props.map.markers[props.lootIndex];
  }

  handleClick() {

  }

  addListener(name, callback) {
    return this.props.overlay.addListener(name, callback);
  }

  render() {
    let classes = 'nu-marker';
    if (this.props.map.mapTypeId == this.marker.layer) {
      classes += ' visible';
    } else {
      classes += ' hidden';
    }

    const lootArray = this.marker.loot.map((loot, i) => (
      <Loot
        data={this.marker.loot[i]}
        tracker={this.props.tracker}
        addListener={this.addListener}
        key={i}
      />
    ));

    return (
      <div className={classes} onClick={this.handleClick}>
        {lootArray}
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
