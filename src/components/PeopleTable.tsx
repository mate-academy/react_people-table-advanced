import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { PeopleList } from './PeopleList';
import { Person } from '../types';
import { PeopleSortType } from '../utils/PeopleSortType';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[]
};

export const PeopleTable = ({ people }: Props) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParam = (sortType: PeopleSortType) => {
    if (sort !== sortType) {
      return { order: null, sort: sortType };
    }

    if (sort === sortType && !order) {
      return { order: 'desc', sort: sortType };
    }

    return { order: null, sort: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(PeopleSortType)
            .map(([sortTypeKey, sortTypeValue]) => (
              <th key={sortTypeKey}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sortTypeKey}
                  <SearchLink params={getSortParam(sortTypeValue)}>
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': sort !== sortTypeValue,
                        'fa-sort-up': sort === sortTypeValue && !order,
                        'fa-sort-down': sort === sortTypeValue,
                      })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <PeopleList people={people} />
    </table>
  );
};
