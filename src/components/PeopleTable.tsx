import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { PersonList } from './PersonList';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { tableSortButtons } from '../utils/constants';
import { FilterParams } from '../types/Filters';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get(FilterParams.Sort) || null;
  const order = searchParams.get(FilterParams.Order) || null;

  const handleSortOrderChange = (sortType : string) => {
    if (sort === sortType) {
      return order ? null : 'desc';
    }

    return null;
  };

  const handleSortTypeChange = (sortType: string) => {
    if (sort === sortType && order === 'desc') {
      return null;
    }

    return sortType;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableSortButtons.map((button) => {
            const sortType = button.toLowerCase();

            return (
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  {button}
                  <SearchLink
                    params={{
                      sort: handleSortTypeChange(sortType) || null,
                      order: handleSortOrderChange(sortType) || null,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== sortType,
                          'fa-sort-up': sort === sortType
                            && !order,
                          'fa-sort-down': sort === sortType
                            && order,
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
        <PersonList people={people} />
      </tbody>
    </table>
  );
};
