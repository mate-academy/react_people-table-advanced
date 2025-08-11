import { useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';

type PeopleTableProps = {
  people: Person[];
};

const COLUMNS_HAS_SORTING = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sortedBySearchParams = searchParams.get('sort') || '';
  const sortOrderSearchParams = searchParams.get('order') || '';

  const handleSorting = (sortBy: string) => {
    if (sortBy !== sortedBySearchParams) {
      return {
        sort: sortBy,
        order: null,
      };
    }

    if (sortBy === sortedBySearchParams && !sortOrderSearchParams) {
      return {
        sort: sortBy,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const peopleMap: Record<string, Person> = {};

  people.forEach(person => {
    peopleMap[person.name] = person;
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS_HAS_SORTING.map(sortField => {
            const sortFieldLow = sortField.toLowerCase();

            return (
              <th key={sortField}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sortField}
                  <SearchLink params={handleSorting(sortFieldLow)}>
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sortedBySearchParams !== sortFieldLow,
                          'fa-sort-up':
                            sortedBySearchParams === sortFieldLow &&
                            !sortOrderSearchParams,
                          'fa-sort-down':
                            sortedBySearchParams === sortFieldLow &&
                            sortOrderSearchParams,
                        })}
                      />
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
        {people.map(person => {
          const {
            slug: personSlug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          const mother = motherName ? peopleMap[motherName] : null;
          const father = fatherName ? peopleMap[fatherName] : null;

          return (
            <tr
              data-cy="person"
              key={personSlug}
              className={cn({ 'has-background-warning': personSlug === slug })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
