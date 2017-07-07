/* eslint-disable no-undef */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Overlay from '../Overlay';
import LootMarker from '../LootMarker';
import * as actions from '../../actions/mapActions';

class HyruleEscapeMap extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.props = props;

    this.state = {
      overlays: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.initMap = this.initMap.bind(this);
    this.addMarkers = this.addMarkers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMapIdChange = this.handleMapIdChange.bind(this);

    this.createMapType = this.createMapType.bind(this);
  }

  componentDidMount() {
    this.initMap(this.props);
  }

  handleMapIdChange(map) {
    this.props.actions.updateMapTypeId(map.getMapTypeId());
  }

  handleClick(e) {
    // Output coords on click
    console.log(e.latLng.lat().toFixed(4) +', '+ e.latLng.lng().toFixed(4));
  }

  initMap(props) {
    const map = this.map = new props.google.maps.Map(document.getElementByid('google-map'), {
      center: {lat: 70, lng: -90},
      zoom: props.zoomBuffer + 2,
      streetViewControl: false,
      mapControlOptions: {
        mapTypeIds: ['2F']
      }
    });

    map.addListener('click', this.handleClick);
    map.addListener('maptypeid_changed', this.handleMapIdChange.bind(this, map));

    const floor2F = props.createMapType('2F', '2F', [4, 8, 16, 32]);

    mapTypes.set('2F', floor2F);
    map.setMapTypeId('lightworld');

    this.props.setPanBounds(map);
    this.addMarkers();
  }

  getNormalizedCoord(coord, zoom) {
    const sizeByZoom = [
      // [w, h]
      [3, 6],
      [6, 12],
      [12, 24],
    ]
  }

  createMapType() {
    return new this.google.maps.ImageMapType({
      getTileUrl: (coord, zoom) => {
        const nCoord = this.getNormalizedCoord(coord, zoom);
        if (!nCoord) return null;
        // y-x
        return `/dungeons/hyruleescape/${zoom - zoomBuffer}/${nCoord.y}-${nCoord.x}`;
      }
    });
  }

  addMarkers() {
    const overlays = this.props.map.markers.map((data, i) => (
      <Overlay
        key={i}
        map={this.map}
        google={this.props.google}
        position={new this.props.google.maps.LatLng(...data.coords)}
      >
        <LootMarker
          data={data}
          lootIndex={i}
          tracker={this.props.tracker}
          store={this.props.route.store}
        />
      </Overlay>
    ));
    this.setState({overlays});
  }

  getRealTilesByZoom(zoom) {
    return {

    }[zoom];
  }

  render() {
    return (
      <div id="map">
        <div id="google-map" />
        {this.state.overlays}
      </div>
    );
  }
}
