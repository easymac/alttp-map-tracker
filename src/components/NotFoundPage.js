import React from 'react';
import Image from './Image';

import { Link } from 'react-router';

const NotFoundPage = () => {
  const locations = [
    'Sahasrahla\'s pocket',
    'sick kid\'s bed',
    'Hera basement',
    'king\'s tomb'
  ];

  const location = locations[Math.floor(Math.random() * (locations.length))];
  return (
    <div className="not-found-page">
      <Image src={`/icons/chest-1-open-1.png`} />
      <h4>
        404
      </h4>
      <p>The item you were looking for is probably in {location}.</p>
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
};

export default NotFoundPage;
