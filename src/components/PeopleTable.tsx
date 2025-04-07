/* eslint-disable react/jsx-key */
import classNames from 'classnames';
import { Person } from '../types';
import { PersonComponent } from './PersonComponent';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredPeople, setFilteredPeople] = useState([...people]);
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const calculateCentury = (number: number) => Math.floor(number / 100 + 1);
  const sortingParams = ['Name', 'Sex', 'Born', 'Died'];

  useEffect(() => {
    const result = people.filter(person => {
      const matchesSex = !sex || person.sex === sex;
      const matchesQuery =
        !query ||
        [person.name, person.fatherName, person.motherName].some(name =>
          name?.toLowerCase().includes(query.toLowerCase()),
        );
      const matchesCentury =
        centuries.length === 0 ||
        centuries.some(century => calculateCentury(person.born) === +century);

      return matchesSex && matchesQuery && matchesCentury;
    });

    setFilteredPeople(result);
  }, [query, sex, centuries, people]);

  const sortedPeople = [...filteredPeople].sort((person1, person2) => {
    switch (sort) {
      case 'Name':
        return person1.name.localeCompare(person2.name);
      case 'Sex':
        return person1.sex.localeCompare(person2.sex);
      case 'Born':
        return person1.born - person2.born;
      case 'Died':
        return person1.died - person2.died;
      default:
        return 0;
    }
  });

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  function setIconClass(value: string) {
    return classNames('fas', {
      'fa-sort-up': value === sort && !order,
      'fa-sort-down': value === sort && order,
      'fa-sort': value !== sort,
    });
  }

  function handleSorting(value: string) {
    const params = new URLSearchParams(searchParams);

    if (!sort || sort !== value) {
      params.set('sort', value);
      params.delete('order');
    }

    if (sort === value && !order) {
      params.set('order', 'desc');
    }

    if (sort === value && order) {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  return filteredPeople.length > 0 ? (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortingParams.map(param => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {param}
                <a>
                  <span className="icon" onClick={() => handleSorting(param)}>
                    <i className={setIconClass(param)} />
                  </span>
                </a>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonComponent key={person.name} person={person} people={people} />
        ))}
      </tbody>
    </table>
  ) : (
    <p>There are no people matching the current search criteria</p>
  );
};
