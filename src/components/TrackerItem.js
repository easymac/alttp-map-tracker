import React from 'react';


class TrackerItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }

  handleClick() {
    this.props.equipItem(this.props.item);
  }

  handleRightClick(e) {
    e.preventDefault();
    this.props.equipItem(this.props.item);
  }

  render() {
    const item = this.props.item;
    const iconUrl = `/icons/${item.id}.png`;
    let classes = 'item unequipped';
    if (item.equipped) classes = 'item equipped';
    return (
      <div className={classes} onClick={this.handleClick} onContextMenu={this.handleRightClick}>
        <img className="icon" src={iconUrl} draggable="false" />
      </div>
    );
  }
}

export default TrackerItem;
