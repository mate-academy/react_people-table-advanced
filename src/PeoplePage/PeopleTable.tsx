import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { SortOption } from './config/types';
import { capitalize } from '../utils/helpers';
import cn from 'classnames';

interface Props {
  filteredPeople: Person[];
  sortParam: SortOption | null;
  sortOrderParam: string | null;
  getSortParam: (value: string) => SearchParams;
}

export const PeopleTable: FC<Props> = ({
  filteredPeople,
  sortParam,
  sortOrderParam,
  getSortParam,
}) => {
  const { personSlug } = useParams();

  const getSortClass = (option: string) =>
    cn('fas', {
      'fa-sort': sortParam !== option,
      'fa-sort-up': sortParam === option && !sortOrderParam,
      'fa-sort-down': sortParam === option && sortOrderParam,
    });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortOption).map(option => {
            const sortClass = getSortClass(option);

            return (
              <th key={option}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {capitalize(option)}
                  <SearchLink params={getSortParam(option)}>
                    <span className="icon" aria-label={`Sort by ${option}`}>
                      <i className={sortClass} />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          const isHighlighted = personSlug === person.slug;

          return (
            <PersonRow
              person={person}
              key={person.slug}
              isHighlighted={isHighlighted}
            />
          );
        })}
      </tbody>
    </table>
  );
};
