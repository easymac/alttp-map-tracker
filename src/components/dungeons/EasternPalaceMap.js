import React from 'react';

import ImageScaleMapType from '../../utils/ImageScaleMapType';

export default class EasternPalaceMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.floors = ['B1', '1F', '2F'];
    this.mapName = 'eastern-palace';

    this.loadImages = this.loadImages.bind(this);
    this.handleMapIdChange = this.handleMapIdChange.bind(this);
    this.initMap = this.initMap.bind(this);

    this.google = props.google;
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
    const floorPromises = this.floors.map(floor => {
      return this.loadImage(`${imgUrl}dungeons/${this.mapName}/${floor}.png`);
    });
    const base1Promise = this.loadImage(`${imgUrl}dungeons/${this.mapName}/base1.png`);
    const base2Promise = this.loadImage(`${imgUrl}dungeons/${this.mapName}/base2.png`);
    return Promise.all([...floorPromises, base1Promise, base2Promise]);
  }

  handleMapIdChange() {
    // Do nothing for now
  }

  initMap(floorImages) {

    // Initialize the Google map
    const map = this.map = new this.props.google.maps.Map(document.querySelector('#google-map'), {
      center: {lat: 40.4804, lng: -67.2363},
      zoom: 4,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: [...this.floors]
      }
    });

    // Set maximum pan area in lat lng
    const allowedBounds = new this.google.maps.LatLngBounds( // eslint-disable-line
      new this.google.maps.LatLng(-40.9467, -179),
      new this.google.maps.LatLng(85.0473, -0)
    );

    // Add an event listener for when the Map Type changes
    map.addListener('maptypeid_changed', this.handleMapIdChange.bind(this, map));

    const base2 = floorImages.pop();
    const base1 = floorImages.pop();
    // Create map types and set them to the map
    this.floors.forEach((floor, index) => {
      const base = (index > 0) ? base1 : base2;
      const mapType = this.createMapType(floor, floorImages[index], base);
      map.mapTypes.set(floor, mapType);
    });

    // Set the default Map Type to the entry floor
    map.setMapTypeId('1F');

    // Restrict the pan area (should merge with allowedBounds??)
    this.props.setPanBounds(map, allowedBounds);
  }

  createMapType(name, image, base) {
    return new ImageScaleMapType(
      image,
      base,
      new google.maps.Size(256, 256), // eslint-disable-line
      5,
      3,
      name
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
