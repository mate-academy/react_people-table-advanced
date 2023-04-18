import { useParams } from 'react-router-dom';
import React from 'react';
import { Person } from '../../types/Person';
import { PersonItem } from '../PersonItem';
import { SortType } from '../../types/SortType';
import { SortLink } from '../PeopleFilter/SortLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { selectedPersonSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortType).map(sorType => (
            <th key={sorType}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sorType.charAt(0).toUpperCase() + sorType.slice(1)}
                <SortLink sortOption={sorType} />
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            isSelected={person.slug === selectedPersonSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
