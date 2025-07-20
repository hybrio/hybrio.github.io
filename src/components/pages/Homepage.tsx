import { Component } from 'react';
import { Link } from 'react-router-dom';
import MyCV from '../../assets/Alexander-CV-2025-public.pdf';
import Typer from '../Typer';

class Homepage extends Component {
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
            dataText={[
              'I make things.',
              'I develop applications.',
              'I design backend systems.',
              'I build tooling.',
              'I integrate cloud platforms.',
            ]}
          />
        </div>
      </>
    );
  }
}

export default Homepage;
