// @flow

import ManualTrigger from '../triggers/ManualTrigger';

class Cycle extends ManualTrigger {
  running: boolean = false;

  componentDidMount() {
    const lastAnimator = this.animators[this.animators.length - 1];
    if (lastAnimator && lastAnimator.events) {
      lastAnimator.events.addListener('finish', () => {
        if (this.running) {
          this.reset();
          super.start();
        }
      });
    }
  }

  start() {
    this.running = true;
    this.reset();
    super.start();
  }

  stop() {
    this.running = false;
  }
}

export default Cycle;
