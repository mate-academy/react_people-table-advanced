import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  selected: string;
};

export const PersonInfo: React.FC<Props> = ({
  person, selected,
}) => {
  const {
    name, sex, born, died, mother, father, motherName, fatherName, slug,
  } = person;
  const isSelected = (user:Person) => user.slug === selected;
  const { search } = useLocation();

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': isSelected(person) },
      )}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search,
          }}
          className={classNames(
            { 'has-text-danger': sex === 'f' },
          )}
        >
          {name}
        </Link>
      </td>
      <td>
        {sex}
      </td>
      <td>
        {born}
      </td>
      <td>
        {died}
      </td>
      <td>
        {mother
          ? (
            <Link
              to={{
                pathname: `/people/${mother.slug}`,
                search,
              }}
              className="has-text-danger"
            >
              {mother.name}
            </Link>
          )
          : (motherName || '-')}
      </td>
      <td>
        {father
          ? (
            <Link
              to={{
                pathname: `/people/${father.slug}`,
                search,
              }}
            >
              {father.name}
            </Link>
          )
          : (fatherName || '-')}
      </td>
    </tr>
  );
};
