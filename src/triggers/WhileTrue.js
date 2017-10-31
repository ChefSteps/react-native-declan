// @flow

import BaseTrigger from './BaseTrigger';

type Props = {
  value: boolean,
};

class WhileTrue extends BaseTrigger {
  constructor(props: Props) {
    super(props);
    this.animators = [];
    this.currentValue = props.value;
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.value === true) {
      this.animators.forEach(({ ref }) => {
        ref.start();
      });
    } else {
      this.animators.forEach(({ ref }) => {
        ref.stop();
      });
    }
  }

  currentValue: boolean;
}

export default WhileTrue;
