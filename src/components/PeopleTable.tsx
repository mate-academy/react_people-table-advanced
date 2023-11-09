import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[],
  sorts: string[],
  order: string,
  searchParams: URLSearchParams,
};

function preparedVisiblePeople(
  people: Person[],
  { sort, order }: { sort: string, order: string },
) {
  let copyPeople = [...people];

  if (sort) {
    copyPeople = copyPeople.sort((person1, person2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return person1[sort].localeCompare(person2[sort]);
        case 'born':
        case 'died':
          return person1[sort] - person2[sort];
        default: return 0;
      }
    });
  }

  if (order) {
    copyPeople = copyPeople.reverse();
  }

  return copyPeople;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  sorts,
  order,
  searchParams,
}) => {
  const sortOrderArr = ['Name', 'Sex', 'Born', 'Died'];
  const sort = sorts[0];

  const toggleSortOrderSigns = (titleParam: string) => {
    // eslint-disable-next-line
    return !sorts.includes(titleParam)
      ? {
        search: getSearchWith(
          searchParams, { sort: titleParam || null, order: null },
        ),
      }
      // eslint-disable-next-line
      : (
        sorts.includes(titleParam) && !order
      )
        ? {
          search: getSearchWith(
            searchParams, { order: 'desc' || null },
          ),
        } : (sorts.includes(titleParam) && order)
          ? {
            search: getSearchWith(
              searchParams, { sort: null, order: null },
            ),
          }
          : {};
  };

  const visiblePeople = preparedVisiblePeople(people, { sort, order });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {
            sortOrderArr.map((arr) => (
              <th key={arr}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {arr}
                  <Link to={toggleSortOrderSigns(arr.toLowerCase())}>
                    <span className="icon">
                      <i
                        className={cn({
                          'fas fa-sort': !sorts.includes(arr.toLowerCase()),
                          'fas fa-sort-up': sorts.includes(arr.toLowerCase())
                            && !order,
                          'fas fa-sort-down': sorts.includes(arr.toLowerCase())
                            && order,
                        })}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            ))
          }

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {
          visiblePeople.map((person) => (
            <PersonLink
              key={person.slug}
              person={person}
            />
          ))
        }
      </tbody>
    </table>
  );
};
