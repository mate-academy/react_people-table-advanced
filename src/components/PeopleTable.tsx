import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonPage } from './PersonPage';
import { SearchLink } from './SearchLink';

enum SortType {
  Alphabet = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

interface FilterSort {
  sortType: SortType | string | null;
  isReversed: string | null;
}

function getSortPeople(
  people: Person[],
  {
    sortType,
    isReversed,
  }: FilterSort,
) {
  const filteredPeople = [...people];

  if (sortType) {
    filteredPeople.sort((person1, person2) => {
      switch (sortType) {
        case SortType.Alphabet:
          return person1.name.localeCompare(person2.name);
        case SortType.Sex:

          return person1.sex.localeCompare(person2.sex);
        case SortType.Born:

          return person1.born - person2.born;
        case SortType.Died:

          return person1.died - person2.died;

        default:
          return 0;
      }
    });
  }

  return isReversed ? filteredPeople.reverse() : filteredPeople;
}

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const { personId = '' } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function handleSortClick(sortType: SortType) {
    if (sort !== sortType) {
      return { sort: sortType, order: null };
    }

    if (!order) {
      return { sort: sortType, order: 'desk' };
    }

    return {
      sort: null,
      order: null,
    };
  }

  const sortedPeople = getSortPeople(people, {
    sortType: sort, isReversed: order,
  });

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
                params={handleSortClick(SortType.Alphabet)}

              >
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sort === SortType.Alphabet && !order,
                    'fa-sort-down': sort === SortType.Alphabet && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={handleSortClick(SortType.Sex)}

              >
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sort === SortType.Sex && !order,
                    'fa-sort-down': sort === SortType.Sex && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={handleSortClick(SortType.Born)}
              >
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sort === SortType.Born && !order,
                    'fa-sort-down': sort === SortType.Born && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={handleSortClick(SortType.Died)}

              >
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sort === SortType.Died && !order,
                    'fa-sort-down': sort === SortType.Died && order,
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
        {sortedPeople.map((person) => (
          <PersonPage
            person={person}
            key={person.slug}
            selectedPerson={personId}
          />
        ))}
      </tbody>
    </table>
  );
};
