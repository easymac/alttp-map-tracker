import React from 'react';

import GoogleMapsLoader from 'google-maps';
import Tracker from '../components/Tracker';

// Adds zoom without adding zoom levels
// Upsizes the sphere that is being projected (mercator)
// to prevent looping data off the edges of tile map

// (without this, one must implement a euclidean projection)
// (this is way easier)

// WARNING: changing this value WILL mess up all LngLats
const zoomBuffer = 3;

class MapContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loaded: false,
    };
    this.google = null;
    GoogleMapsLoader.KEY = 'AIzaSyBVkEjTOCpyPFuaohcQvp2wtxO2CShw2ro';
    GoogleMapsLoader.load(google => {
      this.google = google;
      this.setState({loaded: true});
    });

    this.createMapType = this.createMapType.bind(this);
    this.setPanBounds = this.setPanBounds.bind(this);
  }

  createMapType(id, name, sizeByZoom) {
    return new this.google.maps.ImageMapType({
      getTileUrl: (coord, zoom) => {
        const nCoord = getNormalizedCoord(coord, zoom, sizeByZoom);
        if (!nCoord) return null;
        // y-x
        const imgUrl = IMAGE_URL; // eslint-disable-line
        return `${imgUrl}/${id}/${zoom - zoomBuffer}/${nCoord.y}-${nCoord.x}.png`;
      },
      tileSize: new this.google.maps.Size(256, 256),
      maxZoom: zoomBuffer + sizeByZoom.length - 1,
      minZoom: zoomBuffer,
      name,
    });
  }

  /*
   * Restrict panning to the map region
   * @param map the Google Maps map object
   * @param allowedBounds a google.maps.LatLngBounds object
   */
  setPanBounds(map, allowedBounds) {
    const boundLimits = {
        maxLat: allowedBounds.getNorthEast().lat(),
        maxLng: allowedBounds.getNorthEast().lng(),
        minLat: allowedBounds.getSouthWest().lat(),
        minLng: allowedBounds.getSouthWest().lng()
    };

    let lastValidCenter = map.getCenter();

    this.google.maps.event.addListener(map, 'center_changed', () => {
      const center = map.getCenter();
      if (allowedBounds.contains(center)) {
        lastValidCenter = map.getCenter();
        return;
      }

      let newLat = lastValidCenter.lat();
      let newLng = lastValidCenter.lng();

      if (center.lng() > boundLimits.minLng && center.lng() < boundLimits.maxLng) {
        newLng = center.lng();
      }
      if (center.lat() > boundLimits.minLat && center.lat() < boundLimits.maxLat) {
        newLat = center.lat();
      }

      map.panTo(new this.google.maps.LatLng(newLat, newLng));
    });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <div className="map-container">
          <div className="loading-splash loading" />
        </div>
      );
    }

    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        google: this.google,
        createMapType: this.createMapType,
        zoomBuffer: zoomBuffer,
        setPanBounds: this.setPanBounds,
      })
    );

    return (
      <div className="map-container loaded">
        <div className="loading-splash loaded" />
        <Tracker />
        {childrenWithProps}
      </div>
    );
  }
}

function getNormalizedCoord(coord, zoom, sizeByZoom) {
  if (coord.x < 0 || coord.x >= sizeByZoom[zoom - zoomBuffer]) return false;
  if (coord.y < 0 || coord.y >= sizeByZoom[zoom - zoomBuffer]) return false;
  return {x: coord.x, y: coord.y};
}

export default MapContainer;
