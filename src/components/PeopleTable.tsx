/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  isError: boolean;
};

export const PeopleTable: React.FC<Props> = ({ people, isError }) => {
  const [searchParams] = useSearchParams();
  const [visiblePeople, setVisiblePeople] = useState([...people]);

  useEffect(() => {
    let newVisiblePeople = [...people];

    if (searchParams.get('sex')) {
      newVisiblePeople = newVisiblePeople.filter(
        person => person.sex === searchParams.get('sex'),
      );
    }

    if (searchParams.get('query')) {
      const query = searchParams.get('query') || '';

      newVisiblePeople = newVisiblePeople.filter(
        person =>
          person.name.includes(query) ||
          person.motherName?.includes(query) ||
          person.fatherName?.includes(query),
      );
    }

    if (searchParams.getAll('centuries').length) {
      const centuries = searchParams.getAll('centuries');

      newVisiblePeople = newVisiblePeople.filter(person => {
        const bornCentury = Math.ceil(person.born / 100);
        const diedCentury = Math.ceil(person.died / 100);

        return (
          centuries.includes(`${bornCentury}`) ||
          centuries.includes(`${diedCentury}`)
        );
      });
    }

    if (searchParams.get('sort')) {
      newVisiblePeople = newVisiblePeople.sort((person1, person2) => {
        const order = searchParams.get('order') === 'desc' ? -1 : 1;

        switch (searchParams.get('sort')) {
          case 'Name':
            return order * person1.name.localeCompare(person2.name);
          case 'Sex':
            return order * person1.sex.localeCompare(person2.sex);
          case 'Born':
            return order * (person1.born - person2.born);
          case 'Died':
            return order * (person1.died - person2.died);
          default:
            return 0;
        }
      });
    }

    setVisiblePeople(newVisiblePeople);
  }, [searchParams, people]);

  if (isError) {
    return <p data-cy="peopleLoadingError">Something went wrong</p>;
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  if (!visiblePeople.length) {
    return <p>There are no people matching the current search criteria</p>;
  }

  function getSortParams(sortBy: string) {
    if (searchParams.get('sort') === sortBy) {
      return searchParams.get('order')
        ? getSearchWith(searchParams, { sort: null, order: null })
        : getSearchWith(searchParams, { order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: sortBy, order: null });
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
              <Link to={{ search: getSortParams('Name') }}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: getSortParams('Sex') }}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: getSortParams('Born') }}>
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: getSortParams('Died') }}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          function findParent(parentName: string) {
            return people.find(p => p.name === parentName) || null;
          }

          const mother = person.motherName
            ? findParent(person.motherName)
            : null;
          const father = person.fatherName
            ? findParent(person.fatherName)
            : null;

          return (
            <PersonLink
              person={person}
              mother={mother}
              father={father}
              key={person.slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
