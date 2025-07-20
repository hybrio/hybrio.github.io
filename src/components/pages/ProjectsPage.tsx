import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TagChecker from '../TagChecker';
import parse from 'html-react-parser';

interface GitHubProject {
  id: number;
  name: string;
  html_url: string;
  url: string;
  data?: string;
}

interface ProjectsPageState {
  projects: GitHubProject[];
  width: number;
  height: number;
  previewData: string;
}

class ProjectsPage extends Component<{}, ProjectsPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      projects: [],
      width: 0,
      height: 0,
      previewData:
        '<div style="display: flex; align-items: center; justify-content: center; height: 50vw;">Please hover a repository to view its README.md file</div>',
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    const myRequest = new Request('https://api.github.com/users/hybrio/starred');
  
    const whitelist = ['EmbeddingMap', 'Boids', 'VisualGit_SE701_2019_4', 'DLOplanTool', ' JuliaParallelGraphing']; // ✅ Your project names
  
    fetch(myRequest)
      .then((response) => response.json())
      .then((data: GitHubProject[]) => {
        const filtered = data.filter((project) => whitelist.includes(project.name));
        this.setState({ projects: filtered });
  
        filtered.forEach((project, key) => {
          const readmeRequest = new Request(`${project.url}/readme`, {
            method: 'GET',
            headers: {
              Accept: 'application/vnd.github.VERSION.html',
            },
          });
  
          fetch(readmeRequest)
            .then((response) => response.text())
            .then((readmeHTML: string) => {
              this.setState((prevState) => {
                const updatedProjects = [...prevState.projects];
                updatedProjects[key] = { ...updatedProjects[key], data: readmeHTML };
                return { projects: updatedProjects };
              });
            });
        });
      });
  
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  updatePreview = (data: string) => {
    this.setState({ previewData: data });
  };

  render() {
    const { projects, width, previewData } = this.state;

    return (
      <div>
        <nav className="pageNav">
          <ul className="pageNavList">
            <li>
              <h1 className="Heading">Projects.</h1>
            </li>
            <li id="noPaddingOrMargin">
              <Link to="/" id="noPaddingOrMargin">
                <h1 id="noPaddingOrMargin" className="grow">
                  {'<'}
                </h1>
              </Link>
            </li>
          </ul>

          <ul className="projectList">
            {projects.map((project) => (
              <a
                key={`project-${project.id}`}
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => this.updatePreview(project.data || '')}
              >
                <TagChecker name={project.name} target={project.html_url} data={project.data} />
              </a>
            ))}
          </ul>
        </nav>

        <div id="projects">
          {width >= 768 ? <div className="markdown-body">{parse(previewData)}</div> : null}
        </div>
      </div>
    );
  }
}

export default ProjectsPage;
