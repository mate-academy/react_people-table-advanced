import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  father: string;
  mother: string;
  motherName: string;
  fatherName: string;
}

const PersonName: React.FC<{
  person: Person;
  name: string;
  paramsName: string;
  people: Person[]
}> = ({ person, name, paramsName, people }) => {
  const { search } = useLocation();

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
      to={`/people/${createQueryStr(name)}${search}`}
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
