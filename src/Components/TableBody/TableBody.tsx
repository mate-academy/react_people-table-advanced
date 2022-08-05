import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../People';

type Props = {
  person: Person,
  people: Person[],
};

const TableBody: React.FC<Props> = ({ person, people }) => {
  const {
    slug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const findPerson = (personName: string) => {
    if (people.find(man => man.name === personName)) {
      return (
        <p className="is-clickable">
          {personName}
        </p>
      );
    }

    return (
      <p className="has-text-weight-bold has-text-black">
        {personName}
      </p>
    );
  };

  return (
    <>
      <td>
        <Link to={`/people/${slug}?${searchParams.toString()}`}>
          <p
            className="is-clickable"
            style={sex === 'm'
              ? ({ color: 'rgb(0, 71, 171)' })
              : ({ color: 'rgb(255, 0, 0)' })}
          >
            {name}
          </p>
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td style={{ color: 'rgb(255, 0, 0)' }}>
        <Link to={`/people/${slug}?${searchParams.toString()}`}>
          {motherName && findPerson(motherName)}
        </Link>
      </td>

      <td style={{ color: 'rgb(0, 71, 171)' }}>
        <Link to={`/people/${slug}?${searchParams.toString()}`}>
          {fatherName && findPerson(fatherName)}
        </Link>
      </td>
    </>
  );
};

export default TableBody;
