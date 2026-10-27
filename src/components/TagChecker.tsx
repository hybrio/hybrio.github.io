import { Component } from 'react';


interface TagCheckerProps {
  name: string;
  description?: string | null;
  archived?: boolean;
}

class TagChecker extends Component<TagCheckerProps> {
  render() {
    const { name, description, archived } = this.props;

    return (
      <div className="Repository">
        <span className="repoName">{name}</span>
        {archived ? <div className="Archived">Archived</div> : null}
        {description ? <span className="repoDescription">{description}</span> : null}
      </div>
    );
  }
}

export default TagChecker;
