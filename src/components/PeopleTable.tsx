/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo } from 'react';
import { Person } from '../types/';
import PersonLink from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const peopleWithFamily = useMemo(() => {
    return people.map(person => {
      const newPerson = { ...person };

      if (newPerson.motherName) {
        newPerson.mother = people.find(p => p.name === newPerson.motherName);
      }

      if (newPerson.fatherName) {
        newPerson.father = people.find(p => p.name === newPerson.fatherName);
      }

      return newPerson;
    });
  }, [people]);

  const sortedPeople = useMemo(() => {
    if (!currentSort) {
      return peopleWithFamily;
    }

    const result = [...peopleWithFamily];
    const key = currentSort as keyof Person;

    result.sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue == null || bValue == null) {
        return 0;
      }

      let comparison = 0;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      // apply ascending/descending
      return currentOrder === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [peopleWithFamily, currentSort, currentOrder]);

  const getSortParamsFor = (field: string) => {
    // зараз НЕ сортуємо по цьому полі → 1-й клік → сортуємо ASC
    if (currentSort !== field) {
      return {
        sort: field,
        order: null, // order відсутній → значить ascending
      };
    }

    // вже сортуємо ASC по цьому полі → 2-й клік → ставимо DESC
    if (currentSort === field && currentOrder !== 'desc') {
      return {
        sort: field,
        order: 'desc',
      };
    }

    // вже сортуємо DESC по цьому полі → 3-й клік → вимикаємо сортування
    return {
      sort: null,
      order: null,
    };
  };

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
              <SearchLink params={getSortParamsFor('name')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParamsFor('sex')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParamsFor('born')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParamsFor('died')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">Mother</span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">Father</span>
          </th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={
              person.slug === params.slug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : person.motherName ? (
                person.motherName
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : person.fatherName ? (
                person.fatherName
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
