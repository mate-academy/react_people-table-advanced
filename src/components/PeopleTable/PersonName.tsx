import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { IPerson } from '../../Interfaces/Interfaces';
import { AppContext } from '../../Context/Context';

const PersonName: React.FC<{
  person: IPerson;
  name: string;
  paramsName: string;
}> = ({ person, name, paramsName }) => {
  const { search } = useLocation();
  const { people } = useContext(AppContext);
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
