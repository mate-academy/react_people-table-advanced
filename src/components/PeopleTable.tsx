import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortField } from '../types/SortField';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || SortField.All;
  const sortOrder = searchParams.get('order') || '';

  const handleSortParams = (field: SortField) => {
    if (sortField === field && !sortOrder) {
      return {
        sort: field,
        order: 'desc',
      };
    }

    if (sortField === field && sortOrder) {
      return {
        sort: null,
        order: null,
      };
    }

    return {
      sort: field,
      order: null,
    };
  };

  return (
    <>
      {people.length > 0
        ? (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <SearchLink params={handleSortParams(SortField.Name)}>
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort': sortField !== SortField.Name,
                            'fa-sort-up': sortField === SortField.Name
                              && !sortOrder,
                            'fa-sort-down': sortField === SortField.Name
                              && sortOrder,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink params={handleSortParams(SortField.Sex)}>
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort': sortField !== SortField.Sex,
                            'fa-sort-up': sortField === SortField.Sex
                              && !sortOrder,
                            'fa-sort-down': sortField === SortField.Sex
                              && sortOrder,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink params={handleSortParams(SortField.Born)}>
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort': sortField !== SortField.Born,
                            'fa-sort-up': sortField === SortField.Born
                              && !sortOrder,
                            'fa-sort-down': sortField === SortField.Born
                              && sortOrder,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink params={handleSortParams(SortField.Died)}>
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort': sortField !== SortField.Died,
                            'fa-sort-up': sortField === SortField.Died
                              && !sortOrder,
                            'fa-sort-down': sortField === SortField.Died
                              && sortOrder,
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people.map(person => (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={cn({
                    'has-background-warning': person.slug === slug,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.mother
                      ? (
                        <PersonLink person={person.mother} />
                      )
                      : (person.motherName || '-')}
                  </td>

                  <td>
                    {person.father
                      ? (
                        <PersonLink person={person.father} />
                      )
                      : (person.fatherName || '-')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
        : (
          <p data-cy="noPeopleMessage">
            There are no people matching the current search criteria
          </p>
        )}
    </>
  );
};
