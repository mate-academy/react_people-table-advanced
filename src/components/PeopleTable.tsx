import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Individual } from './Individual';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { selected } = useParams<{ selected: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPerson = selected || '';

  type SortParam = keyof Person;

  const sortParam = searchParams.get('sort') as SortParam | null;
  const orderParam = searchParams.get('order') as 'asc' | 'desc' | null;

  const filteredPeople = people.filter(person => {
    const sexFilter = searchParams.get('sex');
    const centuriesFilter = searchParams.getAll('centuries');
    const queryFilter = searchParams.get('query')?.toLowerCase() || '';

    if (sexFilter && person.sex !== sexFilter) {
      return false;
    }

    if (
      centuriesFilter.length > 0 &&
      !centuriesFilter.includes(String(Math.ceil(person.born / 100)))
    ) {
      return false;
    }

    if (queryFilter && !person.name.toLowerCase().includes(queryFilter)) {
      return false;
    }

    return true;
  });

  const sortedPeople = filteredPeople.sort((a, b) => {
    if (!sortParam) {
      return 0;
    }

    const order = orderParam === 'desc' ? -1 : 1;

    const aValue = a[sortParam] ?? '';
    const bValue = b[sortParam] ?? '';

    if (aValue > bValue) {
      return order;
    } else if (aValue < bValue) {
      return -order;
    } else {
      return 0;
    }
  });

  const getNextOrderParam = (currentOrder: 'asc' | 'desc' | null) => {
    if (currentOrder === 'asc') {
      return 'desc';
    }

    if (currentOrder === 'desc') {
      return null;
    }

    return 'asc';
  };

  const handleSortClick = (sortField: SortParam) => {
    const nextOrder = getNextOrderParam(orderParam);

    const newParams = new URLSearchParams(searchParams.toString());

    if (nextOrder) {
      newParams.set('sort', sortField);
      newParams.set('order', nextOrder);
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <div className="sort-header">
              <span className="header-text">Name</span>
              <span className="icon" onClick={() => handleSortClick('name')}>
                <i
                  className={classNames('fas', {
                    'fa-sort-up': sortParam === 'name' && orderParam === 'asc',
                    'fa-sort-down':
                      sortParam === 'name' && orderParam === 'desc',
                    'fa-sort': sortParam !== 'name' || orderParam === null,
                  })}
                />
              </span>
            </div>
          </th>

          <th>
            <div className="sort-header">
              <span className="header-text">Sex</span>
              <span className="icon" onClick={() => handleSortClick('sex')}>
                <i
                  className={classNames('fas', {
                    'fa-sort-up': sortParam === 'sex' && orderParam === 'asc',
                    'fa-sort-down':
                      sortParam === 'sex' && orderParam === 'desc',
                    'fa-sort': sortParam !== 'sex' || orderParam === null,
                  })}
                />
              </span>
            </div>
          </th>

          <th>
            <div className="sort-header">
              <span className="header-text">Born</span>
              <span className="icon" onClick={() => handleSortClick('born')}>
                <i
                  className={classNames('fas', {
                    'fa-sort-up': sortParam === 'born' && orderParam === 'asc',
                    'fa-sort-down':
                      sortParam === 'born' && orderParam === 'desc',
                    'fa-sort': sortParam !== 'born' || orderParam === null,
                  })}
                />
              </span>
            </div>
          </th>

          <th>
            <div className="sort-header">
              <span className="header-text">Died</span>
              <span className="icon" onClick={() => handleSortClick('died')}>
                <i
                  className={classNames('fas', {
                    'fa-sort-up': sortParam === 'died' && orderParam === 'asc',
                    'fa-sort-down':
                      sortParam === 'died' && orderParam === 'desc',
                    'fa-sort': sortParam !== 'died' || orderParam === null,
                  })}
                />
              </span>
            </div>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <Individual
            person={person}
            selectedPerson={selectedPerson}
            key={person.name}
          />
        ))}
      </tbody>
    </table>
  );
};
