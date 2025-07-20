import React, { Component } from 'react';

interface TagCheckerProps {
  name: string;
  archived?: boolean;
}

class TagChecker extends Component<TagCheckerProps> {
  render() {
    let archivedElement;

    if (this.props.archived) {
      archivedElement = <div className="Archived">Archived</div>;
    } else {
      archivedElement = null;
    }

    return (
      <div className="Repository">
        &nbsp;{this.props.name} {archivedElement}
      </div>
    );
  }
}

export default TagChecker;
