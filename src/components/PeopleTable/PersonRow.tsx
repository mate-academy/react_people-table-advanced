import React, { useState } from 'react';
import { IPerson } from '../../Interfaces/Interfaces';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

const PersonRow: React.FC<{ person: IPerson; people: IPerson[] }> = ({
  person,
  people,
}) => {
  const [isMan, setIsMan] = useState(false);
  const isWoman = false;
  // skip
  const params: { person: string } = useParams();

  const createQueryStr = (personName: string) => {
    if (personName) {
      const queryStr =
        personName.toLowerCase().split(' ').join('-') + `-${person.born}`;

      return queryStr;
    }

    return '';
  };

  const parsParamsName = () => {
    if (params.person) {
      const arrFromName = params.person.split('-');
      const paramsName = arrFromName.slice(0, arrFromName.length - 1).join(' ');

      return paramsName;
    }

    return '';
  };

  const isPersonInPeople = () => {
    const paramsName = parsParamsName();

    if (paramsName) {
      return people.some((item) => item.name.toLowerCase() === paramsName);
    }

    return '';
  };

  console.log(isPersonInPeople());

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const curName = e.currentTarget.text.toLowerCase();
    const paramsName = parsParamsName();
    console.log(curName, params);

    if (isPersonInPeople()) {
      if (curName === paramsName) {
        setIsMan(true);
      } else {
        setIsMan(false);
      }
    }
  };

  return (
    <tr>
      <td>
        <Link
          to={`/people/${createQueryStr(person.name)}`}
          className={cn('name-link', { blue: isMan }, { red: isWoman })}
          onClick={onClick}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <Link
          to={`/people/${createQueryStr(person.mother)}`}
          className="name-link"
          onClick={onClick}
        >
          {person.mother}
        </Link>
      </td>
      <td>
        <Link
          to={`/people/${createQueryStr(person.father)}`}
          className="name-link"
          onClick={onClick}
        >
          {person.father}
        </Link>
      </td>
    </tr>
  );
};

export default PersonRow;

// // hooks
// const params: { person: string } = useParams();
// //query
// const queryNameArr = params.person.split('-');
// const queryName = queryNameArr.slice(0, queryNameArr.length - 1).join(' ');
// const personQueryStr =

// // classnames
// const isMan = queryName === person.name.toLowerCase() && person.sex === 'm';
// const isWomen = queryName === person.name.toLowerCase() && person.sex === 'f';

// const isPersonInPeopleArr = people.some((item) => {
//   console.log(queryName);
//   return item.name.toLowerCase() === queryName;
// });
