// @flow

import ManualTrigger from './ManualTrigger';

type Props = {
  value: boolean,
};

class WhileTrue extends ManualTrigger {
  constructor(props: Props) {
    super(props);
    this.animators = [];
  }

  componentDidMount() {
    this.updateCurrentValue(this.props.value);
  }

  componentWillReceiveProps(newProps: Props) {
    this.updateCurrentValue(newProps.value);
  }

  updateCurrentValue = (newValue: boolean) => {
    if (this.currentValue !== newValue) {
      if (newValue) {
	      this.start();
      } else {
	      this.stop();
      }
    }
    this.currentValue = newValue;
  }

  currentValue: boolean;
}

export default WhileTrue;
