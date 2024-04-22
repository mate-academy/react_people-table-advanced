import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

const findPersonByName = (people: Person[], name: string) =>
  people.find(item => item.name === name);

const renderMotherCell = (person: Person, people: Person[], search: string) => {
  const { motherName } = person;

  if (!motherName) {
    return <td>-</td>;
  }

  const mother = findPersonByName(people, motherName);

  if (!mother) {
    return <td>{motherName}</td>;
  }

  return (
    <td>
      <Link
        to={{ pathname: `../${mother.slug}`, search }}
        className="has-text-danger"
      >
        {motherName}
      </Link>
    </td>
  );
};

const renderFatherCell = (person: Person, people: Person[], search: string) => {
  const { fatherName } = person;

  if (!fatherName) {
    return <td>-</td>;
  }

  const father = findPersonByName(people, fatherName);

  if (!father) {
    return <td>{fatherName}</td>;
  }

  return (
    <td>
      <Link to={{ pathname: `../${father.slug}`, search }}>{fatherName}</Link>
    </td>
  );
};

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { name, slug, sex, born, died } = person;

  const { slugLink } = useParams();
  const [searchParams] = useSearchParams();

  const search = searchParams.toString();

  return (
    <tr
      key={name}
      data-cy="person"
      className={classNames({
        'has-background-warning': slugLink === slug,
      })}
    >
      <td>
        <Link
          to={{ pathname: `../${slug}`, search }}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {renderMotherCell(person, people, search)}
      {renderFatherCell(person, people, search)}
    </tr>
  );
};
