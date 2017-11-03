// @flow

import BaseHOA from './BaseHigherOrderAnimator';

type State = {};
type Props = {
  eachDelay: number,
};

class Stagger extends BaseHOA<any, Props, State> {
  currentAnimatorIndex: number = 0;

  reset() {
    super.reset();
    this.currentAnimatorIndex = 0;
  }

  start() {
    const currentAnimator = this.animators[this.currentAnimatorIndex];
    if (currentAnimator) {
      currentAnimator.ref.start();
      let handle = null;

      // if not the last animator, schedule the next one
      if (this.currentAnimatorIndex < this.animators.length - 1) {
        handle = setTimeout(() => {
          this.currentAnimatorIndex++;
          this.start();
        }, this.props.eachDelay);
      }

      currentAnimator.events.addListener('finish', ({finished}) => {
        if (this.currentAnimatorIndex === this.animators.length - 1) {
          this.props.onFinish && this.props.onFinish({finished});
          handle && clearTimeout(handle);
        } else if (!finished) {
          handle && clearTimeout(handle);
        }
      });
    }
  }

  stop() {
    const currentAnimator = this.animators[this.currentAnimatorIndex];
    if (currentAnimator) {
      currentAnimator.ref.stop();
      let handle = null;

      // if not the last animator, schedule the next one
      if (this.currentAnimatorIndex > 0) {
        handle = setTimeout(() => {
          this.currentAnimatorIndex--;
          this.stop();
        }, this.props.eachDelay);
      }

      currentAnimator.events.addListener('finish_back', ({finished}) => {
        if (this.currentAnimatorIndex === 0) {
          this.props.onFinishBack && this.props.onFinishBack({finished});
          handle && clearTimeout(handle);
        } else if (!finished) {
          handle && clearTimeout(handle);
        }
      });
    }
  }
}

Stagger.defaultProps = {
  eachDelay: 100,
};

export default Stagger;
