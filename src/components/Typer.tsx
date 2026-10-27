import { Component } from 'react';

interface TyperProps {
  heading?: string;
  dataText: string[];
}

interface TyperState {
  text: string;
  isDeleting: boolean;
  loopNum: number;
  typingSpeed: number;
}

class Typer extends Component<TyperProps, TyperState> {
  static defaultProps: Partial<TyperProps> = {
    heading: '',
    dataText: [],
  };

  constructor(props: TyperProps) {
    super(props);

    this.state = {
      text: '',
      isDeleting: false,
      loopNum: 0,
      typingSpeed: 100,
    };
  }

  private timeouts: number[] = [];

  componentDidMount() {
    this.handleType();
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout);
  }

  schedule(fn: () => void, delay: number) {
    const id = window.setTimeout(() => {
      this.timeouts = this.timeouts.filter((t) => t !== id);
      fn();
    }, delay);
    this.timeouts.push(id);
  }

  handleType = () => {
    const { dataText } = this.props;
    const { isDeleting, loopNum, text, typingSpeed } = this.state;

    const i = loopNum % dataText.length;
    const fullText = dataText[i];

    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    this.setState({
      text: updatedText,
      typingSpeed: isDeleting ? 20 : 100,
    });

    if (!isDeleting && updatedText === fullText) {
      this.schedule(() => this.setState({ isDeleting: true }), 500);
    } else if (isDeleting && updatedText === '') {
      this.setState({
        isDeleting: false,
        loopNum: loopNum + 1,
      });
    }

    this.schedule(this.handleType, typingSpeed);
  };

  render() {
    return (
      <div id="test">
        <h2 className="typer">
          {this.props.heading}&nbsp;
          <span>{this.state.text}</span>
          <span id="cursor" />
        </h2>
      </div>
    );
  }
}

export default Typer;
