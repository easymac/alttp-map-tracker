import React from 'react';
import Image from './Image';

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

    let classes = item.id +' '+ 'item unequipped';
    if (item.value > 0) classes = item.id +' '+ 'item equipped';

    return (
      <div className={classes} onClick={this.handleClick} onContextMenu={this.handleRightClick}>
        <Image className="icon" src={iconUrl} draggable="false" />
      </div>
    );
  }
}

export default TrackerUpgradeable;
