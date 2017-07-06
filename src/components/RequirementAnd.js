import React from 'react';
import RequirementOr from './RequirementOr';

class RequirementAnd extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    // Recurse
    const elements = this.props.requires.map((requirement, i) => {
      if (Array.isArray(requirement)) {
        return (
          <RequirementOr
            requires={requirement}
            meetsRequirements={this.props.meetsRequirements}
            getIcon={this.props.getIcon}
            tracker={this.props.tracker}
            key={i}
          />
        );
      } else {
        const meetsRequirement = this.props.meetsRequirements(requirement);
        const classes = (meetsRequirement) ? 'requirement available' : 'requirement unavailable';
        return (
          <div className={classes} key={i}>
            {this.props.getIcon(requirement)}
          </div>
        );
      }
    });
    const meetsRequirements = this.props.meetsRequirements(this.props.requires);
    const classes = (meetsRequirements) ? 'requirements-and available' : 'requirements-and unavailable';
    return (
      <div className={classes}>
        {elements}
      </div>
    );
  }
}

export default RequirementAnd;
