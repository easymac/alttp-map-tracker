import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ImageScaleMapType from '../utils/ImageScaleMapType';
import Overlay from './Overlay';
import LootMarker from './markers/LootMarker';
import DungeonMarker from './markers/DungeonMarker';

import * as actions from '../actions/mapActions';

class OverworldMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      overlays: [],
      dungeonOverlays: []
    };

    this.loadImages = this.loadImages.bind(this);
    this.handleMapIdChange = this.handleMapIdChange.bind(this);
    this.initMap = this.initMap.bind(this);
    this.addMarkers = this.addMarkers.bind(this);

    this.google =  props.google;
  }

  componentDidMount() {
    this.loadImages().then((images) => {
      this.initMap(images);
    });
  }

  loadImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.crossOrigin = "Anonymous";
      img.src = url;
    });
  }

  loadImages() {
    const imgUrl = IMAGE_URL; // eslint-disable-line
    const lightWorldPromise = this.loadImage(`${imgUrl}lightworld.png`);
    const darkWorldPromise = this.loadImage(`${imgUrl}darkworld.png`);
    return Promise.all([lightWorldPromise, darkWorldPromise]);
  }

  handleMapIdChange(map) {
    this.props.actions.updateMapTypeId(map.getMapTypeId());
  }

  handleClick(e) {
    console.log(e.latLng.lat().toFixed(4) +', '+ e.latLng.lng().toFixed(4)); // eslint-disable-line
  }

  initMap(images) {

    // Initialize the Google map
    const map = this.map = new this.props.google.maps.Map(document.querySelector('#google-map'), {
      center: {lat: 70, lng: -90},
      zoom: 3,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ['lightworld', 'darkworld']
      }
    });

    // Set maximum pan area in lat lng
    const allowedBounds = new this.google.maps.LatLngBounds( // eslint-disable-line
      new this.google.maps.LatLng(-0, -179),
      new this.google.maps.LatLng(85, 0)
    );

    // Add an event listener for when the Map Type changes
    map.addListener('maptypeid_changed', this.handleMapIdChange.bind(this, map));

    // Add an event listener for click events
    map.addListener('click', this.handleClick);

    const lightWorldMapType = this.createMapType('Light World', images[0]);
    const darkWorldMapType = this.createMapType('Dark World', images[1]);
    map.mapTypes.set('lightworld', lightWorldMapType);
    map.mapTypes.set('darkworld', darkWorldMapType);

    map.setMapTypeId('lightworld');

    // Restrict the pan area (should merge with allowedBounds??)
    // this.props.setPanBounds(map, allowedBounds);

    this.addMarkers();
    this.addDungeonMarkers();
  }

  createMapType(name, image, base) {
    const scaleFactor = {
      3: 0.25,
      4: 0.5,
      5: 1,
      6: 2
    };
    return new ImageScaleMapType(
      image,
      base,
      new google.maps.Size(256, 256), // eslint-disable-line
      6,
      3,
      name,
      scaleFactor
    );
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
          getProps={this.getProps}
          tracker={this.props.tracker}
          store={this.props.route.store}
        />
      </Overlay>
    ));
    this.setState({overlays});
  }

  addDungeonMarkers() {
    const dungeonOverlays = this.props.dungeons.map((dungeon, i) => (
      <Overlay
        key={i}
        map={this.map}
        google={this.props.google}
        position={new this.props.google.maps.LatLng(...dungeon.coords)}
      >
        <DungeonMarker
          data={dungeon}
          lootIndex={i}
          tracker={this.props.tracker}
          store={this.props.route.store}
        />
      </Overlay>
    ));
    this.setState({dungeonOverlays});
  }

  render() {
    return (
      <div id="map">
        <div id="google-map" />
        {this.state.overlays}
        {this.state.dungeonOverlays}
      </div>
    );
  }
}

export default connect(
  state => ({
    map: state.map,
    tracker: state.itemTracker,
    dungeons: state.map.dungeons
  }),
  dispatch => ({actions: bindActionCreators(actions, dispatch)})
)(OverworldMap);
