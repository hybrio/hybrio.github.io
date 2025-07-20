import { Component } from 'react';


interface TagCheckerProps {
  name: string;
  archived?: boolean;
  target?: string; // add this
  data?: string | undefined; // add this
}

class TagChecker extends Component<TagCheckerProps> {
  render() {
    const { name, archived } = this.props;

    return (
      <div className="Repository">
        &nbsp;{name} {archived ? <div className="Archived">Archived</div> : null}
      </div>
    );
  }
}

export default TagChecker;
