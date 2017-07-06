import React from 'react';


class TrackerUpgradeable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }

  handleClick() {
    this.props.upgradeItem(this.props.item);
  }

  handleRightClick(e) {
    e.preventDefault();
    this.props.downgradeItem(this.props.item);
  }

  render() {
    const item = this.props.item;
    const iconIndex = item.value;
    const iconUrl = `/icons/${item.icons[iconIndex]}.png`;

    let classes = 'item unequipped';
    if (item.value > 0) classes = 'item equipped';

    return (
      <div className={classes} onClick={this.handleClick} onContextMenu={this.handleRightClick}>
        <img className="icon" src={iconUrl} draggable="false" />
      </div>
    );
  }
}

export default TrackerUpgradeable;
