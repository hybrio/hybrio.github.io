import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import me from '../../assets/me-grey.jpg';

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
            I am a software developer from Auckland, New Zealand who enjoys writing code and solving problems.
            <br />
            <br />
            I am a 2020 Computer Systems Engineering (Hons) Graduate from the University of Auckland.
            <br />
            <br />
            Unfortunately I don’t have anything too exciting to show you as of yet (I’m still retrieving my older uni projects) but watch this space.
          </p>
        </div>
      </div>
    );
  }
}

export default AboutPage;
