/* eslint-disable no-undef */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Overlay from '../Overlay';
import LootMarker from '../LootMarker';
import * as actions from '../../actions/mapActions';

import { hyruleEscapeTiles } from '../../constants/dungeonTiles';


// Adds zoom without adding zoom levels
// Upsizes the sphere that is being projected (mercator)
// to prevent looping data off the edges of tile map

// (without this, one must implement a euclidean projection)
// (this is way easier)

// WARNING: changing this value WILL mess up all LngLats
const zoomBuffer = 3;

class HyruleEscapeMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.google = props.google;

    this.state = {
      overlays: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.initMap = this.initMap.bind(this);
    this.addMarkers = this.addMarkers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMapIdChange = this.handleMapIdChange.bind(this);

    this.createMapType = this.createMapType.bind(this);
    this.getNormalizedCoord = this.getNormalizedCoord.bind(this);
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
    const map = this.map = new props.google.maps.Map(document.getElementById('google-map'), {
      center: {lat: 70, lng: -90},
      zoom: props.zoomBuffer + 2,
      streetViewControl: false,
      mapControlOptions: {
        mapTypeIds: ['2F']
      }
    });

    map.addListener('click', this.handleClick);
    map.addListener('maptypeid_changed', this.handleMapIdChange.bind(this, map));

    const floor2F = this.createMapType();
    console.log(floor2F);
    map.mapTypes.set('2F', floor2F);
    map.setMapTypeId('2F');

    const allowedBounds = new this.google.maps.LatLngBounds(
      new this.google.maps.LatLng(-0, -179),
      new this.google.maps.LatLng(85, 0)
    );

    this.props.setPanBounds(map, allowedBounds);
    this.addMarkers();
  }

  getNormalizedCoord(coord, zoom) {
    console.log(coord);
    console.log(hyruleEscapeTiles['2F'][zoom - zoomBuffer])
    const coordArr = hyruleEscapeTiles['2F'][zoom - zoomBuffer].find(a => a[0] == coord.x && a[1] == coord.y);
    if (coordArr)
      return {x: coordArr[0], y: coordArr[1]}
    else
      return false
  }

  createMapType() {
    return new this.google.maps.ImageMapType({
      getTileUrl: (coord, zoom) => {
        const nCoord = this.getNormalizedCoord(coord, zoom);
        console.log(nCoord);
        if (!nCoord) return null;
        // y-x
        console.log(nCoord, (zoom - zoomBuffer));
        return `/dungeons/hyruleescape/2F/${zoom - zoomBuffer}/${nCoord.y}-${nCoord.x}.png`;
      },
      tileSize: new this.google.maps.Size(256, 256),
      maxZoom: zoomBuffer + 3 - 1,
      minZoom: zoomBuffer,
      name: 'Hyrule Map Escape'
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
      </div>
    );
  }
}

export default connect(
  state => ({
    map: state.map,
    tracker: state.itemTracker,
  }),
  dispatch => ({actions: bindActionCreators(actions, dispatch)})
)(HyruleEscapeMap);
