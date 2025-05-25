import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

function sortPeople(people: Person[], sort: string, order: string) {
  switch (sort) {
    case 'name':
    case 'sex':
      return people.sort((person1, person2) =>
        order
          ? person2[sort].localeCompare(person1[sort])
          : person1[sort].localeCompare(person2[sort]),
      );
    case 'born':
    case 'died':
      return people.sort((person1, person2) =>
        order ? person2[sort] - person1[sort] : person1[sort] - person2[sort],
      );
    default:
      return people;
  }
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const visiblePeople = people
    .filter(
      person =>
        person.name.toLowerCase().includes(query.toLocaleLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()),
    )
    .filter(person => (sex ? person.sex === sex : person))
    .filter(person => {
      if (centuries.length === 0) {
        return person;
      }

      return centuries.includes(String(Math.ceil(person.born / 100)));
    });

  sortPeople(visiblePeople, sort, order);

  if (visiblePeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  function handleSortPeople(value: string) {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    setSearchParams(params);

    if (sort) {
      params.set('order', 'desc');
      setSearchParams(params);
    }

    if (sort && order) {
      params.delete('sort');
      params.delete('order');
      setSearchParams(params);
    }
  }

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
              <a onClick={() => handleSortPeople('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleSortPeople('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              {/* <a href="#/people?sort=born&amp;order=desc"> */}
              <a onClick={() => handleSortPeople('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleSortPeople('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          return (
            <PersonLink key={person.name} person={person} people={people} />
          );
        })}
      </tbody>
    </table>
  );
};
