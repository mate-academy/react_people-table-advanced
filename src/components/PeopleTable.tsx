import { memo } from 'react';
import { Person, SortField } from '../types';
import { PeopleTableRow } from './PeopleTableRow';
import { SortLink } from './SortLink';

type Props = {
  people: Person[];
  selectedPersonSlug?: string;
};

export const PeopleTable: React.FC<Props> = memo(({
  people,
  selectedPersonSlug,
}) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        {Object.entries(SortField).map(([option, value]) => (
          <th key={value}>
            <span className="is-flex is-flex-wrap-nowrap">
              {option}

              <SortLink field={value} />
            </span>
          </th>
        ))}

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PeopleTableRow
          key={person.slug}
          person={person}
          selectedPersonSlug={selectedPersonSlug}
        />
      ))}
    </tbody>
  </table>
));
