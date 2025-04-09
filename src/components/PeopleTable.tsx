/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types/Person';
import { useParams } from 'react-router-dom';
import { PersonRow } from './PersonRow';
import { Loader } from './Loader';
import { useState } from 'react';
import cn from 'classnames';

interface Props {
  people: Person[];
  loading: boolean;
  errorMessage: string;
}

export const PeopleTable = ({ people, loading, errorMessage }: Props) => {
  const [sortField, setSortField] = useState('');
  const [sortDestination, setSortDestination] = useState('');

  const { personSlug } = useParams();

  const activePerson = people.find(person => person.slug === personSlug);

  function handleSort(field: string) {
    if (field !== sortField) {
      setSortField(field);
      setSortDestination('asc');
    } else {
      if (sortDestination === 'asc') {
        setSortDestination('desc');
      } else {
        setSortField('');
      }
    }
  }

  const getIcon = (field: string) => {
    return cn('fas', {
      'fa-sort': field !== sortField,
      'fa-sort-up': field === sortField && sortDestination === 'asc',
      'fa-sort-down': field === sortField && sortDestination === 'desc',
    });
  };

  const sortedPeople = [...people].sort((person1, person2) => {
    const firstPerson = person1[sortField as keyof Person];
    const secondPerson = person2[sortField as keyof Person];

    switch (sortDestination) {
      case 'asc':
        return typeof firstPerson === 'string' &&
          typeof secondPerson === 'string'
          ? firstPerson.localeCompare(secondPerson)
          : firstPerson - secondPerson;
      case 'desc':
        return typeof firstPerson === 'string' &&
          typeof secondPerson === 'string'
          ? secondPerson.localeCompare(firstPerson)
          : secondPerson - firstPerson;
      case '':
      default:
        return 0;
    }
  });

  return (
    <div className="box table-container">
      {loading && <Loader />}

      {errorMessage && <p data-cy="peopleLoadingError">{errorMessage}</p>}

      {!loading && !people.length && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span
                  className="is-flex is-flex-wrap-nowrap"
                  onClick={() => handleSort('name')}
                >
                  Name
                  <a href="#/people?sort=name">
                    <span className="icon">
                      <i className={getIcon('name')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span
                  className="is-flex is-flex-wrap-nowrap"
                  onClick={() => handleSort('sex')}
                >
                  Sex
                  <a href="#/people?sort=sex">
                    <span className="icon">
                      <i className={getIcon('sex')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span
                  className="is-flex is-flex-wrap-nowrap"
                  onClick={() => handleSort('born')}
                >
                  Born
                  <a href="#/people?sort=born&amp;order=desc">
                    <span className="icon">
                      <i className={getIcon('born')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span
                  className="is-flex is-flex-wrap-nowrap"
                  onClick={() => handleSort('died')}
                >
                  Died
                  <a href="#/people?sort=died">
                    <span className="icon">
                      <i className={getIcon('died')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {sortedPeople.map(person => {
              return (
                <PersonRow
                  person={person}
                  activePerson={activePerson}
                  key={person.slug}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
