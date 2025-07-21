import { Component } from 'react';
import { Link } from 'react-router-dom';
import me from '../../assets/me-grey.jpeg';

class AboutPage extends Component {
  render() {
    return (
      <div>
        <nav className="pageNav">
          <ul className="pageNavList">
            <li>
              <h1 className="Heading">About me.</h1>
            </li>
            <li id="noPaddingOrMargin">
              <Link to="/" id="noPaddingOrMargin">
                <h1 id="noPaddingOrMargin" className="grow">{'\u003C'}</h1>
              </Link>
            </li>
          </ul>
        </nav>
        <div id="about">
          <img className="portrait" src={me} alt="image of me" />
          <p id="about-text">
            Hi I'm Alexander
            <br />
            <br />
            <br />
            I’m a full-stack software developer based in Auckland with seven years of industry experience. 
            <br />
            <br />
            I’ve built scalable systems, worked on AI-driven feature development, and enjoy solving complex technical problems.
            <br />
            <br />
            I’m currently working on making some of my older projects available — watch this space!
          </p>
        </div>
      </div>
    );
  }
}

export default AboutPage;
