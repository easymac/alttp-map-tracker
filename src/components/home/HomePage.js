import React from 'react';
import Image from '../Image';

const HomePage = () => {
  return (
    <div className="home-page">
      <Image className="logo" src={`/logo.png`} />
      <h1>Randomizer Map Tracker</h1>
      <h2>for The Legend of Zelda: A Link to the Past</h2>
      <span className="version">1.0.0</span>

      <span className="try">Try it:</span>
      <a href="/maps" className="button new-game">New Game</a>

      <h3>About</h3>
      <p>
        This is a simple tool for learning <a href="http://vt.alttp.run">A Link
        to the Past: VT Randomizer</a>. It features a dynamic map of all item
        locations and their prerequisites, allowing you to track your items,
        automatically track which locations you can access with your items, and
        track which locations you have already checked. There’s also a timer.
      </p>
      <p>
        Created by easymac. The tracker component is heavily inspired by <a href="https://www.twitch.tv/crossproduct">
        crossproduct</a>’s tracker. <a href="http://maplequeensaku.weebly.com/news/legend-of-zelda-a-link-to-the-past-randomizer-overworld-item-locations-guide">
        Sakura Tsubasa’s blog</a> was a tremendous help and was my primary
        resource for learning item locations. Map images taken from <a href="http://ian-albert.com/games/legend_of_zelda_a_link_to_the_past_maps/">
        ian-albert.com</a>.
      </p>
      <p>
        I intend to continue development after release. I’ll probably mostly
        talk about development in the #community-dev channel of the Discord. My
        name there is easymac.
      </p>
      <p>
        This project is available on <a href="https://github.com/easymac/alttp-map-tracker">
        GitHub</a>. If you would like to support the project, please feel free
        to add suggestions and bug reports as issues or contact me directly and
        definitely feel free to make pull requests.
      </p>
    </div>
  );
};

export default HomePage;
