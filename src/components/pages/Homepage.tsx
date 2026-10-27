import { Component } from 'react';
import { Link } from 'react-router-dom';
import MyCV from '../../assets/Alexander-Maehl-CV-2026.pdf';
import Typer from '../Typer';
import statements from '../Statements';

class Homepage extends Component {
  componentDidMount() {
    document.title = 'Alexander Maehl | Senior Software Engineer, Auckland';
  }

  render() {
    return (
      <>
        <nav className="homePageNav">
          <ul className="homeNavList">
            <li className="homePageNavItem">
              <a
                href={MyCV}
                rel="noopener noreferrer"
                target="_blank"
                className="link"
              >
                <h1 className="grow">Curriculum vitae.</h1>
              </a>
            </li>
            <li className="homePageNavItem">
              <Link to="/projects" className="link">
                <h1 className="grow">Projects.</h1>
              </Link>
            </li>
            <li className="homePageNavItem">
              <Link to="/about" className="link">
                <h1 className="grow">About.</h1>
              </Link>
            </li>
          </ul>
        </nav>
        <div id="content">
          <Typer
            heading="My name is Alexander,"
            dataText={statements}
          />
        </div>
      </>
    );
  }
}

export default Homepage;
