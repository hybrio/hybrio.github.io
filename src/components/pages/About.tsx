import { Component } from 'react';
import { Link } from 'react-router-dom';
import { toWords } from 'number-to-words';
import me from '../../assets/me-grey.jpeg';
import ContactLinks from '../ContactLinks';

const currentYear = new Date().getFullYear();
const experienceYears = currentYear - 2018;
const experience = toWords(experienceYears);

class AboutPage extends Component {
  componentDidMount() {
    document.title = 'About | Alexander Maehl';
  }

  render() {
    return (
      <div>
        <nav className="pageNav">
          <ul className="pageNavList">
            <li>
              <h1 className="Heading">About me.</h1>
            </li>
            <li>
              <Link to="/" className="backLink grow" aria-label="Back to home">
                {'<'}
              </Link>
            </li>
          </ul>
        </nav>
        <div id="about">
          <img className="portrait" src={me} alt="Portrait of Alexander Maehl" />
          <div id="about-text">
            <p>Hi, I’m Alexander.</p>
            <p>
              I’m a senior software engineer based in Auckland with {experience} years of industry experience.
            </p>
            <p>
              I’ve built scalable systems, worked on AI-driven feature development, and enjoy solving complex technical problems.
            </p>
            <p>
              You can find some of my older work on the <Link to="/projects">projects page</Link>.
            </p>
          </div>
          <ContactLinks />
        </div>
      </div>
    );
  }
}

export default AboutPage;
