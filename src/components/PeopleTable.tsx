import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  people: Person[];
  selectedPerson: string | null;
  filteredPeople: Person[];
}

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  filteredPeople,
}) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const filteredPeoples = () => {
    const filtered = [...filteredPeople];

    filtered.sort((person1: Person, person2: Person) => {
      let result = 0;

      switch (currentSort) {
        case 'name':
          result = result = person1.name.localeCompare(person2.name);
          break;
        case 'sex':
          result = person1.sex.localeCompare(person2.sex);
          break;
        case 'born':
          result = person1.born - person2.born;
          break;
        case 'died':
          result = person1.died - person2.died;
          break;
        default:
          result = 1;
      }

      if (currentOrder === 'desc') {
        result *= -1;
      }

      return result;
    });

    return filtered;
  };

  const filteredAndSorted = filteredPeoples();

  const getNextSearchParams = (
    searchParamses: URLSearchParams,
    key: string,
  ) => {
    if (currentOrder === 'desc' && currentSort === key) {
      return getSearchWith(searchParamses, { sort: null, order: null });
    }

    if (currentSort === key) {
      return getSearchWith(searchParamses, { sort: key, order: 'desc' });
    }

    return getSearchWith(searchParamses, { sort: key, order: null });
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
              <Link to={{ search: getNextSearchParams(searchParams, 'name') }}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      { 'fa-sort': currentSort !== 'name' || !currentOrder },
                      { 'fa-sort-up': currentSort === 'name' && !currentOrder },
                      {
                        'fa-sort-down': currentSort === 'name' && currentOrder,
                      },
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: getNextSearchParams(searchParams, 'sex') }}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      { 'fa-sort': currentSort !== 'sex' || !currentOrder },
                      { 'fa-sort-up': currentSort === 'sex' && !currentOrder },
                      { 'fa-sort-down': currentSort === 'sex' && currentOrder },
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: getNextSearchParams(searchParams, 'born') }}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      { 'fa-sort': currentSort !== 'born' || !currentOrder },
                      { 'fa-sort-up': currentSort === 'born' && !currentOrder },
                      {
                        'fa-sort-down': currentSort === 'born' && currentOrder,
                      },
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: getNextSearchParams(searchParams, 'died') }}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      { 'fa-sort': currentSort !== 'died' || !currentOrder },
                      { 'fa-sort-up': currentSort === 'died' && !currentOrder },
                      {
                        'fa-sort-down': currentSort === 'died' && currentOrder,
                      },
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredAndSorted.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={classNames({
              'has-background-warning': person.slug === selectedPerson,
            })}
          >
            <td>
              <PersonLink
                slug={person.slug}
                name={person.name}
                isDangerous={person.sex === 'f'}
              />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <PersonLink
                  slug={
                    people.find(p => p.name === person.motherName)?.slug || ''
                  }
                  name={person.motherName}
                  isDangerous={true}
                />
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink
                  slug={
                    people.find(p => p.name === person.fatherName)?.slug || ''
                  }
                  name={person.fatherName}
                  isDangerous={false}
                />
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
