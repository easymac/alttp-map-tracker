import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { getRoutes } from '../routes';
import { Router } from 'react-router';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;


    return (
      <Provider store={store}>
        <Router history={history} routes={getRoutes(store)} store={store} />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
