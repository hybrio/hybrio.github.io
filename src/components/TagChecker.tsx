import { Component } from 'react';
import type { ReactNode } from 'react';


interface TagCheckerProps {
  name: string;
  archived?: boolean;
  target?: string; // add this
  data?: string | undefined; // add this
  children?: ReactNode;
}

class TagChecker extends Component<TagCheckerProps> {
  render() {
    const { name, archived, children } = this.props;

    return (
      <div className="Repository">
        &nbsp;{name} {archived ? <div className="Archived">Archived</div> : null}
        {children}
      </div>
    );
  }
}

export default TagChecker;
