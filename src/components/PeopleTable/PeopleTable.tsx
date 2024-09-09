import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { TablePerson } from '../TablePerson';
import { SearchLink } from '../SearchLink/SearchLink';
import classNames from 'classnames';
import { OrderType, SortOptions } from '../../utils/enums';

type Props = {
  people: Person[];
};
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortOption = (newSort: string) => {
    if (newSort !== currentSort) {
      return { sort: newSort, order: null };
    }

    if (newSort === currentSort && !order) {
      return { sort: newSort, order: OrderType.desc };
    }

    return { sort: null, order: null };
  };

  const getSortClass = (sort: string) => {
    return classNames('fas', {
      'fa-sort': sort !== currentSort,
      'fa-sort-up': sort === currentSort && !order,
      'fa-sort-down': sort === currentSort && !!order,
    });
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
              <SearchLink params={{ ...getSortOption('name') }}>
                <span className="icon">
                  <i className={getSortClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ ...getSortOption(SortOptions.Sex) }}>
                <span className="icon">
                  <i className={getSortClass(SortOptions.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ ...getSortOption(SortOptions.Born) }}>
                <span className="icon">
                  <i className={getSortClass(SortOptions.Died)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <TablePerson person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
