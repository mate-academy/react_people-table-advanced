/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';
import { useSearchParams } from 'react-router-dom';
import { ColumnFilter } from '../ColumnFilter/ColumnFilter';
import { clearPeopleList } from '../../utils/clearPeopleList';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = clearPeopleList(
    people,
    centuries,
    sex,
    query,
    sort,
    order,
  );

  if (!visiblePeople.length) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <ColumnFilter columnName="Name" />
          </th>
          <th>
            <ColumnFilter columnName="Sex" />
          </th>
          <th>
            <ColumnFilter columnName="Born" />
          </th>
          <th>
            <ColumnFilter columnName="Died" />
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const father = people.find(
            personItem => personItem.name === person.fatherName,
          );
          const mother = people.find(
            personItem => personItem.name === person.motherName,
          );

          return (
            <PersonInfo
              key={person.slug}
              person={person}
              father={father}
              mother={mother}
            />
          );
        })}
      </tbody>
    </table>
  );
};
