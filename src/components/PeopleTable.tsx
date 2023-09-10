import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person as PersonType } from '../types';
import { Person } from './Person';
import { SearchLink } from './SearchLink';
import { SortBy } from '../types/SortBy';

type Props = {
  people: PersonType [],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortOrderIcon = (field: string) => (
    classNames('fas', {
      'fa-sort': sort !== `${field}`,
      'fa-sort-up': sort === `${field}` && order !== 'desc',
      'fa-sort-down': sort === `${field}` && order === 'desc',
    })
  );

  const handleSortType = (field: string) => {
    if (!order && sort === field) {
      return {
        sort: field,
        order: 'desc',
      };
    }

    if (order && sort === field) {
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
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink
                params={handleSortType(SortBy.Name)}
              >
                <span className="icon">
                  <i className={sortOrderIcon(SortBy.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={handleSortType(SortBy.Sex)}
              >
                <span className="icon">
                  <i className={sortOrderIcon(SortBy.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={handleSortType(SortBy.Born)}
              >
                <span className="icon">
                  <i className={sortOrderIcon(SortBy.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={handleSortType(SortBy.Died)}
              >
                <span className="icon">
                  <i className={sortOrderIcon(SortBy.Died)} />
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
          <Person
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
