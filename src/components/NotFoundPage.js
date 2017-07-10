import React from 'react';
import Image from './Image';

import { Link } from 'react-router';

const NotFoundPage = () => {
  const sahanames = [
    'sahasralah', 'sabotaging', 'sacahuista', 'sacahuiste', 'saccharase', 'saccharide', 'saccharify',
    'saccharine', 'saccharins', 'sacerdotal', 'sackcloths', 'salmonella', 'saltarelli', 'saltarello',
    'saltations', 'saltbushes', 'saltcellar', 'saltshaker', 'salubrious', 'sandgrouse', 'sandlotter',
    'sandstorms', 'sandwiched', 'sauerkraut', 'schipperke', 'schismatic', 'schizocarp', 'schmalzier',
    'schmeering', 'schmoosing', 'shibboleth', 'shovelnose', 'sahananana', 'sarararara', 'salamander',
    'sharshalah', 'shahabadoo', 'sassafrass'
  ];

  // Pick a random sahaname, capitalize, and add 's or '
  let sahaString = sahanames[Math.floor(Math.random() * (sahanames.length))];
  sahaString = sahaString.charAt(0).toUpperCase() + sahaString.slice(1);
  sahaString += (sahaString.charAt(sahaString.length - 1) == 's') ? "'" : "'s";


  const locations = [
    `${sahaString} pocket`,
    'Sick Kid\'s bed',
    'Hera basement',
    'King\'s Tomb'
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
