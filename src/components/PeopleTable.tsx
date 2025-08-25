import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const allNames = new Set(people?.map(p => p.name));
  const location = useLocation();
  const selectedSlug = location.pathname.split('/')[2];

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  let filteredPeople = people || [];

  if (sex) {
    filteredPeople = filteredPeople.filter(p => p.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.motherName?.toLowerCase().includes(query) ||
        p.fatherName?.toLowerCase().includes(query),
    );
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(p => {
      const personCentury = Math.floor(p.born / 100) + 1;

      return centuries.includes(String(personCentury));
    });
  }

  const getSortLink = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (params.get('sort') !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!params.get('order')) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    return `?${params.toString()}`;
  };

  if (sort) {
    filteredPeople = [...filteredPeople].sort((a, b) => {
      let valA: string | number | undefined;
      let valB: string | number | undefined;

      switch (sort) {
        case 'name':
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
          break;
        case 'sex':
          valA = a.sex;
          valB = b.sex;
          break;
        case 'born':
          valA = a.born;
          valB = b.born;
          break;
        case 'died':
          valA = a.died;
          valB = b.died;
          break;
        default:
          return 0;
      }

      let result: number;

      if (typeof valA === 'string' && typeof valB === 'string') {
        result = valA.localeCompare(valB);
      } else {
        result = (valA as number) - (valB as number);
      }

      return order === 'desc' ? -result : result;
    });
  }

  function getClasses(field: 'name' | 'sex' | 'born' | 'died') {
    if (sort === field && !order) {
      return 'fas fa-sort-up';
    } else if (sort === field && order === 'desc') {
      return 'fas fa-sort-down';
    } else {
      return 'fas fa-sort';
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
              <Link to={{ pathname: '/people', search: getSortLink('name') }}>
                <span className="icon">
                  <i className={getClasses('name')} />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ pathname: '/people', search: getSortLink('sex') }}>
                <span className="icon">
                  <i className={getClasses('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ pathname: '/people', search: getSortLink('born') }}>
                <span className="icon">
                  <i className={getClasses('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ pathname: '/people', search: getSortLink('died') }}>
                <span className="icon">
                  <i className={getClasses('died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople?.map(person => {
          const isSelected = selectedSlug === person.slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={`${isSelected ? 'has-background-warning' : ''}`}
            >
              <td>
                <PersonLink
                  name={person.name}
                  people={filteredPeople}
                ></PersonLink>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  allNames.has(person.motherName) ? (
                    <PersonLink
                      name={person.motherName}
                      people={filteredPeople}
                    />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  allNames.has(person.fatherName) ? (
                    <PersonLink
                      name={person.fatherName}
                      people={filteredPeople}
                    />
                  ) : (
                    person.fatherName
                  )
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
