import React from 'react';
import RequirementAnd from './RequirementAnd';

class RequirementOr extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    // Recurse
    const elements = this.props.requires.map((requirement, i) => {
      if (Array.isArray(requirement)) {
        return (
          <RequirementAnd
            requires={requirement}
            meetsRequirements={this.props.meetsRequirements}
            getIcon={this.props.getIcon}
            tracker={this.props.tracker}
            key={i}
          />
        );
      } else {
        const meetsRequirement = this.props.meetsRequirements(requirement);
        const classes = (meetsRequirement) ? 'requirement-or available' : 'requirement-or unavailable';
        return (
          <div className={classes} key={i}>
            {this.props.getIcon(requirement)}
          </div>
        );
      }
    });
    const meetsRequirements = this.props.meetsRequirements([this.props.requires]);
    const classes = (meetsRequirements) ? 'requirements-or available' : 'requirements-or unavailable';
    return (
      <div className={classes}>
        {elements}
      </div>
    );
  }
}

export default RequirementOr;
