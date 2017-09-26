import React from 'react';
import Image from '../Image';

class NuRequirement extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.requirementsToDOMTree = this.requirementsToDOMTree.bind(this);
  }

  getIcon(requirement) {
    if (typeof requirement === 'string') {
      return <Image className="icon" src={`/icons/${requirement}.png`} />;
    } else {
      const item = this.props.tracker.upgradeables.find(i => i.id == requirement.id);
      if (typeof item !== 'undefined') {
        return <Image className="icon" src={`/icons/${item.icons[requirement.value]}.png`}  />;
      }
    }
  }

  reqsToDOMTreeOr(requirements) {
    return requirements.reduce((acc, requirement, i) => {
      let result;
      let available = '';

      if (Array.isArray(requirement)) {
        available = this.props.meetsRequirementsAnd(requirement) ? 'available' : '';
        result = (
          <div className={`requirement-and ${available}`} key={i}>
            {this.requirementsToDOMTree(requirement)}
          </div>
        );
      } else {
        available = this.props.meetsRequirements(requirement) ? 'available' : '';
        result = (
          <div className={`requirement ${available}`} key={i}>
            {this.getIcon(requirement)}
          </div>
        );
      }

      return [...acc, result];
    }, []);
  }

  requirementsToDOMTree(requirements) {
    return requirements.reduce((acc, requirement, i) => {
      let result;
      let available = '';

      if (Array.isArray(requirement)) {
        available = this.props.meetsRequirementsOr(requirement) ? 'available' : '';
        result = (
          <div className={`requirement-or ${available}`} key={i}>
            {this.reqsToDOMTreeOr(requirement)}
          </div>
        );
      } else {
        available = this.props.meetsRequirements(requirement) ? 'available' : '';
        result = (
          <div className={`requirement ${available}`} key={i}>
            {this.getIcon(requirement)}
          </div>
        );
      }

      return [...acc, result];
    }, []);
  }

  // Recursively sort requirements
  sortRequirements(requirements) {
    const res = requirements.reduce((acc, curr) => {
      if (Array.isArray(curr)) {
        acc.push(this.sortRequirements(curr));
      } else {
        acc.unshift(curr);
      }
      return acc;
    }, []);
    return res;
  }

  render() {
    const requirements = this.sortRequirements(this.props.requirements);

    return (
      <div className="requirements-pane">
        {this.requirementsToDOMTree(requirements)}
      </div>
    );
  }
}


export default NuRequirement;
