import React from 'react';

import ImageScaleMapType from '../utils/ImageScaleMapType';

export default class NuOverworldMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.loadImages = this.loadImages.bind(this);
    this.handleMapIdChange = this.handleMapIdChange.bind(this);
    this.initMap = this.initMap.bind(this);

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

  handleMapIdChange() {
    // Do nothing for now
  }

  initMap(images) {

    // Initialize the Google map
    const map = this.map = new this.props.google.maps.Map(document.querySelector('#google-map'), {
      center: {lat: 70, lng: -90},
      zoom: 0,
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

    const lightWorldMapType = this.createMapType('Light World', images[0]);
    const darkWorldMapType = this.createMapType('Dark World', images[1]);
    map.mapTypes.set('lightworld', lightWorldMapType);
    map.mapTypes.set('darkworld', darkWorldMapType);

    map.setMapTypeId('lightworld');

    // Restrict the pan area (should merge with allowedBounds??)
    // this.props.setPanBounds(map, allowedBounds);
  }

  createMapType(name, image, base) {
    const scaleFactor = {
      0: 0.25,
      1: 0.5,
      2: 1,
      3: 2
    };
    return new ImageScaleMapType(
      image,
      base,
      new google.maps.Size(256, 256), // eslint-disable-line
      3,
      0,
      name,
      scaleFactor
    );
  }

  render() {
    return (
      <div id="map">
        <div id="google-map" />
      </div>
    );
  }
}
