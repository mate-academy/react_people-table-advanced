import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../utils/searchHelper';
import { PersonLink } from './personLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const handleToggleSort = (sortBy: string): SearchParams => {
    if (!currentSort || currentSort !== sortBy) {
      return { sort: sortBy, order: 'desc' };
    }

    if (currentSort === sortBy && currentOrder === 'desc') {
      return { sort: sortBy, order: null };
    }

    return { sort: sortBy, order: 'desc' };
  };

  const getSortIconClass = (sortBy: string): string => {
    if (currentSort !== sortBy) {
      return 'fa-sort';
    }

    return currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <SearchLink params={handleToggleSort('name')}>
                  <span className="icon">
                    <i
                      className={classNames('fas', getSortIconClass('name'))}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SearchLink params={handleToggleSort('sex')}>
                  <span className="icon">
                    <i className={classNames('fas', getSortIconClass('sex'))} />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SearchLink params={handleToggleSort('born')}>
                  <span className="icon">
                    <i
                      className={classNames('fas', getSortIconClass('born'))}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SearchLink params={handleToggleSort('died')}>
                  <span className="icon">
                    <i
                      className={classNames('fas', getSortIconClass('died'))}
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
            <PersonLink key={person.slug} person={person} people={people} />
          ))}
        </tbody>
      </table>
    </>
  );
};
