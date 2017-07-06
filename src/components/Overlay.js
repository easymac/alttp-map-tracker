/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';

class Overlay extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.overlay = null;
    this.div = null;

    this.renderChildren = this.renderChildren.bind(this);
    this.rerenderChildren = this.rerenderChildren.bind(this);
    this.initOverlay.bind(this);
    this.initOverlay();
  }

  componentDidUpdate() {
    // hacky shit averted
    // but left in case it becomes unaverted
    // this.rerenderChildren(this.div);
  }

  initOverlay() {

    const reactClass = this;

    function SimpleOverlay(map) {
      this.map_ = map;
      this.div_ = null;
      this.setMap(map);
    }

    SimpleOverlay.prototype = new google.maps.OverlayView();
    reactClass.overlay = new SimpleOverlay(this.props.map);

    SimpleOverlay.prototype.onAdd = function() {
      const div = reactClass.div = document.createElement('div');
      reactClass.renderChildren(div);
      div.className = 'overlay';
      div.style.position = 'absolute';
      this.div_ = div;

      const panes = this.getPanes();
      panes.overlayMouseTarget.appendChild(div);

      const me = this;
      google.maps.event.addDomListener(div, 'dblclick', function(e) {
        google.maps.event.trigger(me, 'dblclick', e);
      });
      google.maps.event.addDomListener(div, 'contextmenu', function(e) {
        google.maps.event.trigger(me, 'rightclick', e);
      });
    };

    SimpleOverlay.prototype.draw = function() {
      const overlayProjection = this.getProjection();
      const pos = overlayProjection.fromLatLngToDivPixel(reactClass.props.position);
      const div = this.div_;
      div.style.left = pos.x + 'px';
      div.style.top = pos.y + 'px';
    };
  }

  rerenderChildren(div) {
    div.innerHTML = "";
    this.renderChildren(div);
  }

  renderChildren(div) {
    const childrenWithProps = React.cloneElement(this.props.children, { overlay: this.overlay });
    ReactDOM.render(childrenWithProps, div);
  }

  render() {
    return null;
  }
}

export default Overlay;
