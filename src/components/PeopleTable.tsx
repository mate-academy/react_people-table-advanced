import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSortedPeople } from '../customHooks/useSortedPeople';
import { Person } from '../types';
import { PersonItem } from './PersonItem';
import { SortLink } from './SortLink';
import tableHeaders from '../data/tableHeaders.json';

interface Props {
  people: Person[]
}

export const PeopleTable: FC<Props> = memo(({ people }) => {
  const { slug: selectedSlug } = useParams();

  const sortedPeople = useSortedPeople(people);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map(header => (
            <th key={header.id}>
              {header.sortParametr
                ? (
                  <span className="is-flex is-flex-wrap-nowrap">
                    {header.title}
                    <SortLink parametrValue={header.sortParametr} />
                  </span>
                )
                : header.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>

        {sortedPeople.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            isSelected={selectedSlug === person.slug}
          />
        ))}

      </tbody>
    </table>
  );
});
