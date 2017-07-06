import React from 'react';


class Timer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.interval = null;
    this.elapsed = 0;
    this.totalElapsed = 0;

    this.state = {
      timeString: '00:00:00',
      currently: 'not-started',
    };

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.update = this.update.bind(this);
    this.startPause = this.startPause.bind(this);
  }

  componentWillUnmount() {
  }

  update() {
    const elapsed = this.totalElapsed + this.elapsed;
    let seconds = parseInt((elapsed / 1000) % 60);
    let minutes = parseInt((elapsed / (1000 * 60)) % 60);
    let hours = parseInt((elapsed / (1000 * 60 * 60)) % 24);
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    minutes = (minutes < 10) ? '0' + minutes: minutes;
    hours = (hours < 10) ? '0' + hours : hours;
    this.setState({timeString: `${hours}:${minutes}:${seconds}`});
  }

  start() {
    this.setState({currently: 'running'});
    this.startTime = Date.now();
    this.interval = setInterval(() => {
      this.elapsed = Date.now() - this.startTime;
      this.update();
    }, 10);
  }

  pause() {
    this.setState({currently: 'paused'});
    this.totalElapsed = this.totalElapsed + this.elapsed;
    clearInterval(this.interval);
  }

  reset() {
    clearInterval(this.interval);
    this.elapsed = 0;
    this.totalElapsed = 0;
    this.setState({currently: 'not-started'});
    this.update();
  }

  startPause() {
    if (this.state.currently == 'running') return this.pause();
    this.start();
  }

  render() {
    const timeImages = [...this.state.timeString].map((char, i) => {
      const name = (char == ':') ? 'colon' : char;
      return (
        <img
          className="time-char"
          src={`/icons/${name}.png`}
          key={i}
        />
      );
    });

    const startPauseTexts = {
      'not-started': 'Start',
      'paused': 'Resume',
      'running': 'Pause',
    };

    return (
      <div id="timer" className={this.state.currently}>
        <div className="display">
          {timeImages}
        </div>
        <div className="control">
          <div className="button start-pause" onClick={this.startPause}>{startPauseTexts[this.state.currently]}</div>
          <div className="button reset" onClick={this.reset}>Reset</div>
        </div>
      </div>
    );
  }
}

export default Timer;
