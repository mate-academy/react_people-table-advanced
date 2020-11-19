import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { IPerson } from '../../Interfaces/Interfaces';

const PersonName: React.FC<{
  person: IPerson;
  name: string;
  paramsName: string;
  people: IPerson[];
}> = ({ person, name, paramsName, people = [] }) => {
  const createQueryStr = (personName: string) => {
    if (personName) {
      const queryStr =
        personName.toLowerCase().split(' ').join('-') + `-${person.born}`;

      return queryStr;
    }

    return '';
  };

  const lowerName = person.name.toLowerCase();
  const isPersonInList = people.some((item) => name === item.name);

  return (
    <Link
      to={`/people/${createQueryStr(name)}`}
      className={cn(
        'name-link',
        {
          blue: paramsName === lowerName && person.sex === 'm',
        },
        {
          red: paramsName === lowerName && person.sex === 'f',
        },
        {
          bold: name && paramsName === name.toLowerCase() && !isPersonInList,
        }
      )}
    >
      {name}
    </Link>
  );
};

export default PersonName;
