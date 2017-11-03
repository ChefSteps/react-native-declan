// @flow

import BaseHOA from './BaseHigherOrderAnimator';

class Sequence extends BaseHOA {
  currentAnimatorIndex: number = 0;

  reset() {
    super.reset();
    this.currentAnimatorIndex = 0;
  }

  start() {
    const currentAnimator = this.animators[this.currentAnimatorIndex];
    if (currentAnimator) {
      currentAnimator.ref.start();
      currentAnimator.events.addListener('finish', ({finished}) => {
        if (this.currentAnimatorIndex === this.animators.length - 1) {
          this.props.onFinish && this.props.onFinish({finished});
        } else if (finished) {
          this.currentAnimatorIndex++;
          this.start();
        }
      });
    }
  }

  stop() {
    const currentAnimator = this.animators[this.currentAnimatorIndex];
    if (currentAnimator) {
      currentAnimator.ref.stop();
      currentAnimator.events.addListener('finish_back', ({finished}) => {
        if (this.currentAnimatorIndex === 0) {
          this.props.onFinishBack && this.props.onFinishBack({finished});
        } else if (finished) {
          this.currentAnimatorIndex--;
          this.stop();
        }
      });
    }
  }
}

export default Sequence;
