import React from 'react';
import classNames from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { name, sex, born, died, fatherName, motherName, slug } = person;
  const { search } = useLocation();
  const { slugParam } = useParams();

  const findParent = (parentName: string) =>
    people.find(({ name: curName }) => curName === parentName);

  const renderParent = (parentName: string | null, status: string) => {
    if (!parentName) {
      return '-';
    }

    const foundedParent = findParent(parentName);

    if (!foundedParent) {
      return parentName;
    }

    return (
      <Link
        to={{
          pathname: `/people/${foundedParent.slug}`,
          search: search.toString(),
        }}
        className={classNames({ 'has-text-danger': status === 'mother' })}
      >
        {parentName}
      </Link>
    );
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slugParam === slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: search.toString(),
          }}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{renderParent(motherName, 'mother')}</td>
      <td>{renderParent(fatherName, 'father')}</td>
    </tr>
  );
};
