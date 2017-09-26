import React from 'react';
import Image from '../Image';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/mapActions';

import { push } from 'react-router-redux';

class DungeonMarker extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      redirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.marker = props.map.dungeons[props.lootIndex];
  }

  handleClick() {
    this.props.store.dispatch(push(`/maps/${this.props.data.hash}/`));
  }

  render() {
    const data = this.props.data;
    const iconURL = `/dungeons/${data.hash}/boss.png`;
    let classes = 'dungeon-marker';
    if (this.props.map.mapTypeId == this.marker.layer) {
      classes += ' visible';
    } else {
      classes += ' hidden';
    }
    return (
      <div className={classes} onClick={this.handleClick}>
        <Image className="dungeon-icon" src={iconURL} />
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
)(DungeonMarker);
