import { Component } from 'react';
import { Link } from 'react-router-dom';
import TagChecker from '../TagChecker';
import parse from 'html-react-parser';

interface GitHubProject {
  id: number;
  name: string;
  html_url: string;
  url: string;
  description: string | null;
}

interface ProjectsPageState {
  projects: GitHubProject[];
  status: 'loading' | 'loaded' | 'error';
  selected: string | null;
  readmes: Record<string, string>;
}

// Repos to show, in display order, with human-friendly names
const showcase: Record<string, string> = {
  EmbeddingMap: 'Embedding Map',
  Boids: 'Boids',
  VisualGit_SE701_2019_4: 'VisualGit (SE701)',
  DLOplanTool: 'DLO Plan Tool',
  JuliaParallelGraphing: 'Julia Parallel Graphing',
};
const showcaseOrder = Object.keys(showcase);

const README_UNAVAILABLE =
  '<p>This README couldn’t be loaded right now. Select the project name to view it on GitHub.</p>';

class ProjectsPage extends Component<object, ProjectsPageState> {
  private requestedReadmes = new Set<string>();

  constructor(props: object) {
    super(props);
    this.state = {
      projects: [],
      status: 'loading',
      selected: null,
      readmes: {},
    };
  }

  componentDidMount() {
    document.title = 'Projects | Alexander Maehl';

    fetch('https://api.github.com/users/hybrio/starred?per_page=100')
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((data: GitHubProject[]) => {
        const projects = data
          .filter((project) => project.name in showcase)
          .sort((a, b) => showcaseOrder.indexOf(a.name) - showcaseOrder.indexOf(b.name));
        this.setState({ projects, status: projects.length ? 'loaded' : 'error' });
        if (projects.length) this.selectProject(projects[0]);
      })
      .catch(() => this.setState({ status: 'error' }));
  }

  selectProject = (project: GitHubProject) => {
    this.setState({ selected: project.name });
    if (this.requestedReadmes.has(project.name)) return;
    this.requestedReadmes.add(project.name);

    fetch(`${project.url}/readme`, {
      headers: { Accept: 'application/vnd.github.html+json' },
    })
      .then((response) => (response.ok ? response.text() : Promise.reject(response.status)))
      .catch(() => README_UNAVAILABLE)
      .then((readmeHTML: string) => {
        this.setState((prevState) => ({
          readmes: { ...prevState.readmes, [project.name]: readmeHTML },
        }));
      });
  };

  renderList() {
    const { projects, status, selected } = this.state;

    if (status === 'loading') {
      return <p className="projectStatus">Loading projects…</p>;
    }
    if (status === 'error') {
      return (
        <p className="projectStatus">
          Couldn’t load projects from GitHub right now. You can find them on{' '}
          <a href="https://github.com/hybrio" target="_blank" rel="noopener noreferrer">
            my GitHub profile
          </a>
          .
        </p>
      );
    }

    return (
      <ul className="projectList">
        {projects.map((project) => (
          <li key={`project-${project.id}`}>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`projectLink${selected === project.name ? ' selected' : ''}`}
              onMouseEnter={() => this.selectProject(project)}
              onFocus={() => this.selectProject(project)}
            >
              <TagChecker name={showcase[project.name]} description={project.description} />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { selected, readmes } = this.state;
    const preview = selected ? readmes[selected] : undefined;

    return (
      <div className="projectsLayout">
        <nav className="pageNav">
          <ul className="pageNavList">
            <li>
              <h1 className="Heading">Projects.</h1>
            </li>
            <li>
              <Link to="/" className="backLink grow" aria-label="Back to home">
                {'<'}
              </Link>
            </li>
          </ul>
          {this.renderList()}
        </nav>

        <div className="markdown-body" aria-live="polite">
          {preview ? parse(preview) : selected ? <p>Loading README…</p> : null}
        </div>
      </div>
    );
  }
}

export default ProjectsPage;
