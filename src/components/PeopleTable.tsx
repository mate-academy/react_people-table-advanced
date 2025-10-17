import { useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      setSearchParams(
        getSearchWith(searchParams, { sort: field, order: null }),
      );
    } else if (!currentOrder) {
      setSearchParams(getSearchWith(searchParams, { order: 'desc' }));
    } else {
      setSearchParams(getSearchWith(searchParams, { sort: null, order: null }));
    }
  };

  const renderSortableHeader = (field: string, label: string) => {
    const isActive = sortBy === field;
    const arrowClass = order === 'desc' ? 'fa-arrow-down' : 'fa-arrow-up';

    return (
      <th>
        {label}
        <button
          type="button"
          onClick={() => handleSort(field)}
          className="button is-small is-white ml-1"
          role="button"
          aria-label={`Sort by ${label}`}
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleSort(field);
            }
          }}
        >
          <i
            className={`fas ${isActive ? arrowClass : 'fa-sort'}`}
            aria-hidden="true"
          />
        </button>
      </th>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderSortableHeader('name', 'Name')}
          {renderSortableHeader('sex', 'Sex')}
          {renderSortableHeader('born', 'Born')}
          {renderSortableHeader('died', 'Died')}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isActive = location.pathname === `/people/${person.slug}`;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': isActive,
              })}
            >
              <td>
                <PersonLink personName={person.name} people={people} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink personName={person.motherName} people={people} />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink personName={person.fatherName} people={people} />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
