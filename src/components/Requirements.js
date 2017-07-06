import React from 'react';

import RequirementAnd from './RequirementAnd';

class Requirements extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.getIcon = this.getIcon.bind(this);
  }

  getIcon(requirement) {
    if (typeof requirement === 'string') {
      return <img className="icon" src={`/icons/${requirement}.png`} />;
    } else {
      const item = this.props.tracker.upgradeables.find(i => i.id == requirement.id);
      if (typeof item !== 'undefined') {
        return <img className="icon" src={`/icons/${item.icons[requirement.value]}.png`}  />;
      }
    }
  }

  render() {
    if (this.props.requires.length == 0) return (
      <div className="requirements" />
    );
    return (
      <div className="requirements">
        <RequirementAnd
          requires={this.props.requires}
          meetsRequirements={this.props.meetsRequirements}
          getIcon={this.getIcon}
        />
      </div>
    );
  }
}

export default Requirements;
