import React from 'react';
import Image from '../Image';

class ChestCounter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.dblclickListener = this.props.addListener('dblclick', this.handleDoubleClick);
    this.rightclickListener = this.props.addListener('rightclick', this.handleRightClick);
  }

  componentWillUnmount() {
    // this.props.removeListener(this.dblclickListener);
    // this.props.removeListener(this.rightclickListener);
  }

  handleDoubleClick(e) {
    e.stopPropagation();
  }

  handleClick() {
    this.openChest();
  }

  openChest() {
    const count = this.props.count;
    const open = this.state.open;
    if (open + 1 > count) {
      this.setState({open: 0});
      this.update(0);
    } else {
      this.setState({open: open + 1});
      this.update(open + 1);
    }
  }

  closeChest() {
    const count = this.props.count;
    const open = this.state.open;
    if (open - 1 < 0) {
      this.setState({open: count});
      this.update(count);
    } else {
      this.setState({open: open - 1});
      this.update(open - 1);
    }
  }

  update(open) {
    if (this.props.count == open) {
      this.props.setStatus('all-open');
    } else {
      this.props.setStatus('');
    }
  }

  handleRightClick(e) {
    if (e.target == this.imgEl || e.target == this.el) {
      this.closeChest();

      e.preventDefault();
      e.stopPropagation();
    }
  }

  numToImages(num) {
    return num.toString().split('').map((char, i) => (
      <Image key={i} src={`/icons/${char}.png`} />
    ));
  }

  render() {
    const count = this.props.count;
    const open = this.state.open;

    if (count <= 6) {
      const iconURL = `/icons/chest-${count}-open-${open}.png`;
      return (
        <div className="chest-counter" onClick={this.handleClick} ref={ref => this.el = ref}>
          <Image className="icon" src={iconURL} ref={ref => this.imgEl = ref}/>
        </div>
      );
    }
    const chestString = (count == open) ? `chest-1-open-1` : `chest-1-open-0`;
    const chestURL = `/icons/${chestString}.png`;
    const countEl = <div className="count">{this.numToImages(count)}</div>;
    const openEl = (count != open) ? <div className="open">{this.numToImages(count - open)}</div> : '';
    return (
      <div className="chest-counter" onClick={this.handleClick} ref={ref => this.el = ref}>
        <Image className="icon" src={chestURL} ref={ref => this.imgEl = ref}/>
        {countEl}
        {openEl}
      </div>
    );
  }
}

export default ChestCounter;
