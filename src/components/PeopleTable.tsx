import React from 'react';
import { Person } from '../types';
import { Human } from './Human';
import { useParams, useSearchParams } from 'react-router-dom';
import { SortLink } from './SortLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sortColumn = searchParams.get('sort') || null;
  const isReversed = searchParams.get('order') || null;

  const preparedPeople = [...people];

  if (sortColumn) {
    preparedPeople.sort((personA, personB) => {
      switch (sortColumn) {
        case 'name':
          return personA.name.localeCompare(personB.name);
        case 'sex':
          return personA.sex.localeCompare(personB.sex);
        case 'born':
          return personA.born - personB.born;
        case 'died':
          return personA.died - personB.died;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedPeople.reverse();
  }

  const tableColumnNames = ['name', 'sex', 'born', 'died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableColumnNames.map(columnName => (
            <th key={columnName}>
              <span className="is-flex is-flex-wrap-nowrap">
                {columnName[0].toUpperCase() + columnName.slice(1)}
                <SortLink columnName={columnName} />
              </span>
            </th>
          ))}

          <th>
            <span className="is-flex is-flex-wrap-nowrap">Mother</span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">Father</span>
          </th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <Human key={person.slug} person={person} selectedSlug={slug} />
        ))}
      </tbody>
    </table>
  );
};
