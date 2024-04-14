import { useContext } from 'react';
import { PeopleContext } from '../../context/PeopleContext';
import { Person } from '../Person/Person';
import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';
import { getVisiblePeople } from '../../utils/getVisiblePeople';
import classNames from 'classnames';

const columns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable = () => {
  const { people } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = getVisiblePeople(
    people,
    searchParams.get('query'),
    searchParams.getAll('centuries'),
    searchParams.get('sex'),
    sort,
    order,
  );

  const isParentColumn = (column: string) =>
    column === 'Mother' || column === 'Father';

  const handleSort = (column: string) => {
    const title = column.toLowerCase();

    if (!sort) {
      return { sort: title, order: null };
    } else if (sort && !order) {
      return { sort: title, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {visiblePeople.length ? (
        <>
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column}>
                  {isParentColumn(column) ? (
                    column
                  ) : (
                    <span className="is-flex is-flex-wrap-nowrap">
                      {column}
                      <SearchLink params={handleSort(column)}>
                        <span className="icon">
                          <i
                            className={classNames('fas', {
                              'fa-sort': sort !== column.toLowerCase(),
                              'fa-sort-up':
                                sort === column.toLowerCase() && !order,
                              'fa-sort-down':
                                sort === column.toLowerCase() && order,
                            })}
                          />
                        </span>
                      </SearchLink>
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visiblePeople.map(person => (
              <Person key={person.slug} person={person} />
            ))}
          </tbody>
        </>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </table>
  );
};
