/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PeopleTableHeader } from './PeopleTableHeader';

interface Props {
  people: Person[];
  activeSlug: string | null;
  sortBy: string;
  order: 'asc' | 'desc';
  setSearchParams: (params: URLSearchParams) => void;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  activeSlug,
  sortBy,
  order,
  setSearchParams,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHeader
        sortBy={sortBy}
        order={order}
        setSearchParams={setSearchParams}
      />

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            onClick={() => {
              navigate({
                pathname: `/people/${person.slug}`,
                search: searchParams.toString(),
              })
            }}
            className={
              activeSlug === person.slug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink name={person.name} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName} people={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
