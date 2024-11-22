import { FC } from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';
import { SearchLink } from '../../shared/SearchLink';
import { sortLinksParams } from '../../constants/personLinks';
import { usePeopleSort } from '../../hooks/usePeopleSort';
import { SortIcon } from '../../shared/SortIcon';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { getSortParams } = usePeopleSort();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortLinksParams.map(({ sortType, title }) => (
            <th key={title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <SearchLink params={getSortParams(sortType)}>
                  <SortIcon sortType={sortType} />
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonItem key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
