/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { ParentLink } from './ParentLink';
import { Person } from '../../../types';

interface Props {
  person: Person;
}

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { user } = useParams();
  const [searchParams] = useSearchParams();

  const { name, sex, slug, born, died } = person;
  const params = !!searchParams.size ? `?${searchParams}` : '';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': user === slug,
      })}
    >
      <td>
        <a
          className={classNames({ 'has-text-danger': sex === 'f' })}
          href={`#/people/${slug}${params}`}
        >
          {name}
        </a>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <ParentLink person={person} parentSex="f" />
      </td>
      <td>
        <ParentLink person={person} parentSex="m" />
      </td>
    </tr>
  );
};
