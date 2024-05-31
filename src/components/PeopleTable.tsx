import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import React, { useState } from 'react';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
}
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || '';
  const orderParam = searchParams.get('order') || '';
  const [sortField, setSortField] = useState<string>(sortParam);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>(
    orderParam === 'desc' ? 'desc' : 'asc',
  );

  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedPeople = [...people].sort((a, b) => {
    let comparison = 0;

    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'sex') {
      comparison = a.sex.localeCompare(b.sex);
    } else if (sortField === 'born') {
      comparison = a.born - b.born;
    } else if (sortField === 'died') {
      comparison = a.died - b.died;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const toggleSortOrder = () => {
    setSearchParams({
      sort: sortField,
      order: sortOrder === 'asc' ? 'desc' : '',
    });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => handleSortChange('name')}
            >
              Name
              <Link
                to={`#/people?sort=name${sortField === 'name' && sortOrder === 'desc' ? '&order=desc' : ''}`}
                onClick={toggleSortOrder}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortField !== 'name',
                      'fa-sort-up':
                        sortField === 'name' && sortOrder !== 'desc',
                      'fa-sort-down':
                        sortField === 'name' && sortOrder === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => handleSortChange('sex')}
            >
              Sex
              <Link
                to={`#/people?sort=sex${sortField === 'sex' && sortOrder === 'desc' ? '&order=desc' : ''}`}
                onClick={toggleSortOrder}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortField !== 'sex',
                      'fa-sort-up': sortField === 'sex' && sortOrder !== 'desc',
                      'fa-sort-down':
                        sortField === 'sex' && sortOrder === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => handleSortChange('born')}
            >
              Born
              <Link
                to={`#/people?sort=born${sortField === 'born' && sortOrder === 'desc' ? '&order=desc' : ''}`}
                onClick={toggleSortOrder}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortField !== 'born',
                      'fa-sort-up':
                        sortField === 'born' && sortOrder !== 'desc',
                      'fa-sort-down':
                        sortField === 'born' && sortOrder === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => handleSortChange('died')}
            >
              Died
              <Link
                to={`#/people?sort=died${sortField === 'died' && sortOrder === 'desc' ? '&order=desc' : ''}`}
                onClick={toggleSortOrder}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortField !== 'died',
                      'fa-sort-up':
                        sortField === 'died' && sortOrder !== 'desc',
                      'fa-sort-down':
                        sortField === 'died' && sortOrder === 'desc',
                    })}
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
        {sortedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={person?.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <Link
                to={`../${person.slug}`}
                className={person?.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <Link
                  to={`../${person.mother.slug}`}
                  className={classNames({
                    'has-text-danger': person.mother.sex === 'f',
                  })}
                >
                  {person.mother.name}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <Link to={`../${person.father.slug}`}>
                  {person.father.name}
                </Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
