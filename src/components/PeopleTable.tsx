/* eslint-disable jsx-a11y/control-has-associated-label */

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();
  const [selectPerson, setSelectPerson] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuriesParam = searchParams.get('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';
  const sex = searchParams.get('sex');

  useEffect(() => {
    if (slug) {
      setSelectPerson(slug);
    }
  }, [slug]);

  const findPersonByName = (name: string | undefined | null): Person | null =>
    name
      ? people.find(p => p.name.toLowerCase() === name.toLowerCase()) || null
      : null;

  const selectedCenturies = centuriesParam
    ? centuriesParam.split(',').map(Number)
    : [];

  const filteredPeople = people
    .filter(person =>
      [person.name, person.motherName, person.fatherName].some(field =>
        field?.toLowerCase().includes(query),
      ),
    )
    .filter(person => {
      if (selectedCenturies.length === 0) {
        return true;
      }

      // Calculation of the century for the year of birth 'person.born'
      const century = Math.floor(person.born / 100) + 1;

      return selectedCenturies.includes(century);
    })
    .filter(person => {
      if (sex === 'm') {
        return person.sex === 'm';
      } else if (sex === 'f') {
        return person.sex === 'f';
      }

      return true;
    });

  if (sort) {
    filteredPeople.sort((a, b) => {
      if (sort === 'name') {
        return order === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sort === 'sex') {
        return order === 'asc'
          ? a.sex.localeCompare(b.sex)
          : b.sex.localeCompare(a.sex);
      } else if (sort === 'born') {
        return order === 'asc' ? a.born - b.born : b.born - a.born;
      } else if (sort === 'died') {
        return order === 'asc' ? a.died - b.died : b.died - a.died;
      }

      return 0;
    });
  }

  const handleSorting = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort === field) {
      if (currentOrder === 'asc') {
        searchParams.set('order', 'desc');
      } else if (currentOrder === 'desc') {
        searchParams.delete('sort');
        searchParams.delete('order');
      } else {
        searchParams.set('order', 'asc');
      }
    } else {
      searchParams.set('sort', field);
      searchParams.set('order', 'asc');
    }

    navigate(`${location.pathname}?${searchParams.toString()}`);
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
              <a
                href="#/people?sort=name"
                onClick={e => {
                  e.preventDefault();
                  handleSorting('name');
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'name' && order === 'asc',
                      'fa-sort-down': sort === 'name' && order === 'desc',
                      'fa-sort': sort !== 'name',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={e => {
                  e.preventDefault();
                  handleSorting('sex');
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'sex' && order === 'asc',
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                      'fa-sort': sort !== 'sex',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={e => {
                  e.preventDefault();
                  handleSorting('born');
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'born' && order === 'asc',
                      'fa-sort-down': sort === 'born' && order === 'desc',
                      'fa-sort': sort !== 'born',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={e => {
                  e.preventDefault();
                  handleSorting('died');
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'died' && order === 'asc',
                      'fa-sort-down': sort === 'died' && order === 'desc',
                      'fa-sort': sort !== 'died',
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
        <>
          {filteredPeople.map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === selectPerson,
              })}
            >
              <td>
                <PersonLink person={person} searchParams={location.search} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <>
                <td>
                  {person.motherName ? (
                    findPersonByName(person.motherName) ? (
                      <PersonLink
                        person={findPersonByName(person.motherName)}
                        searchParams={location.search}
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
                    findPersonByName(person.fatherName) ? (
                      <PersonLink
                        person={findPersonByName(person.fatherName)}
                        searchParams={location.search}
                      />
                    ) : (
                      person.fatherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </>
            </tr>
          ))}
        </>
      </tbody>
    </table>
  );
};
