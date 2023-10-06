import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { TABLE_COLUMN_NAMES, TABLE_SORT_FIELDS } from '../utils/constants';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { PersonInfo } from './PersonInfo';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const preparedPeople = getPreparedPeople(people, searchParams);

  const getSortedPeople = () => {
    if (!sort) {
      return preparedPeople;
    }

    const sortedPeople = preparedPeople.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);
        case 'born':
        case 'died':
          return a[sort] - b[sort];
        default:
          return 0;
      }
    });

    if (order) {
      return sortedPeople.reverse();
    }

    return sortedPeople;
  };

  const getSearchParams = (columnTitle: string) => {
    const currentColumnTitle = columnTitle.toLowerCase();

    if (currentColumnTitle !== sort) {
      return { sort: currentColumnTitle, order: null };
    }

    if (currentColumnTitle === sort && !order) {
      return { sort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const peopleToRender = getSortedPeople();

  return (
    <>
      {peopleToRender.length
        ? (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {TABLE_COLUMN_NAMES.map(columnTitle => {
                  const newSearchParams = getSearchParams(columnTitle);

                  return TABLE_SORT_FIELDS.includes(columnTitle)
                    ? (
                      <th key={columnTitle}>
                        <span className="is-flex is-flex-wrap-nowrap">
                          {columnTitle}
                          <SearchLink
                            params={newSearchParams}
                          >
                            <span className="icon">
                              <i
                                className={classNames('fas', 'fa-sort', {
                                  'fa-sort': sort !== columnTitle.toLowerCase(),
                                  'fa-sort-up':
                                  sort === columnTitle.toLowerCase() && !order,
                                  'fa-sort-down':
                                  sort === columnTitle.toLowerCase() && order,
                                })}
                              />
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                    ) : (
                      <th key={columnTitle}>
                        {columnTitle}
                      </th>
                    );
                })}
              </tr>
            </thead>

            <tbody>
              {peopleToRender.map(person => (
                <PersonInfo person={person} key={person.slug} />
              ))}
            </tbody>
          </table>
        ) : (
          'There are no people matching the current search criteria'
        )}
    </>
  );
};
