import { useMemo } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonComponent } from './PersonComponent';
import { SortPeople } from '../types/sortPeople';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') as SortPeople || '';
  const order = searchParams.get('order') || '';

  const handleSortState = (value: SortPeople) => {
    const params = new URLSearchParams(searchParams);

    if (!searchParams.has('sort')
      || (searchParams.has('sort') && sort !== value)
      || (searchParams.has('sort') && sort !== value)) {
      params.set('sort', value);
      if (searchParams.has('order')) {
        params.delete('order');
      }
    } else if (searchParams.has('sort') && sort === value) {
      params.set('order', 'desc');
    }

    if (searchParams.has('sort') && searchParams.has('order')
    && sort === value) {
      params.delete('order');
      params.delete('sort');
    }

    setSearchParams(params);
  };

  const sortedPeople = useMemo(() => {
    let sortedPeopleCopy = [...people];

    if (sort) {
      sortedPeopleCopy = people.sort((pers1, pers2) => {
        const value1 = pers1[sort];
        const value2 = pers2[sort];
        let res = 0;

        if (typeof value1 === 'number' && typeof value2 === 'number') {
          res = value1 - value2;
        }

        if (typeof value1 === 'string' && typeof value2 === 'string') {
          res = value1.localeCompare(value2);
        }

        return order === 'desc' ? res * -1 : res;
      });
    }

    return sortedPeopleCopy;
  }, [sort, people, order]);

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
              <button
                onClick={() => handleSortState(SortPeople.Name)}
                type="button"
              >
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': sort !== SortPeople.Name,
                    'fa-sort-up': sort === SortPeople.Name && !order,
                    'fa-sort-down': sort === SortPeople.Name && order,
                  })}
                  />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <button
                onClick={() => handleSortState(SortPeople.Sex)}
                type="button"
              >
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': sort !== SortPeople.Sex,
                    'fa-sort-up': sort === SortPeople.Sex && !order,
                    'fa-sort-down': sort === SortPeople.Sex && order,
                  })}
                  />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <button
                onClick={() => handleSortState(SortPeople.Born)}
                type="button"
              >
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': sort !== SortPeople.Born,
                    'fa-sort-up': sort === SortPeople.Born && !order,
                    'fa-sort-down': sort === SortPeople.Born && order,
                  })}
                  />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <button
                onClick={() => handleSortState(SortPeople.Died)}
                type="button"
              >
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': sort !== SortPeople.Died,
                    'fa-sort-up': sort === SortPeople.Died && !order,
                    'fa-sort-down': sort === SortPeople.Died && order,
                  })}
                  />
                </span>
              </button>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((person) => (
          <PersonComponent person={person} key={Math.random()} />
        ))}
      </tbody>
    </table>
  );
};
