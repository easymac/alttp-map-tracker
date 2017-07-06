import React from 'react';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div id="app-component">
        {React.cloneElement(this.props.children, { store: this.props.store })}
      </div>
    );
  }
}

export default App;
