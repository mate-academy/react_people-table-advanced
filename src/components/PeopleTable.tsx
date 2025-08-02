import React from 'react';
import { Person } from '../types';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  humans: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ humans }) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const handleSort = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    const newParams = new URLSearchParams(searchParams.toString());

    if (currentSort !== field) {
      newParams.set('sort', field);
      newParams.delete('order');
    } else if (!currentOrder) {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
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
              onClick={() => handleSort('name')}
              style={{ cursor: 'pointer' }}
            >
              Name
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sortField !== 'name',
                    'fa-sort-up': sortField === 'name' && sortOrder !== 'desc',
                    'fa-sort-down':
                      sortField === 'name' && sortOrder === 'desc',
                  })}
                />
              </span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => handleSort('sex')}
              style={{ cursor: 'pointer' }}
            >
              Sex
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sortField !== 'sex',
                    'fa-sort-up': sortField === 'sex' && sortOrder !== 'desc',
                    'fa-sort-down': sortField === 'sex' && sortOrder === 'desc',
                  })}
                />
              </span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => handleSort('born')}
              style={{ cursor: 'pointer' }}
            >
              Born
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sortField !== 'born',
                    'fa-sort-up': sortField === 'born' && sortOrder !== 'desc',
                    'fa-sort-down':
                      sortField === 'born' && sortOrder === 'desc',
                  })}
                />
              </span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              onClick={() => handleSort('died')}
              style={{ cursor: 'pointer' }}
            >
              Died
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': sortField !== 'died',
                    'fa-sort-up': sortField === 'died' && sortOrder !== 'desc',
                    'fa-sort-down':
                      sortField === 'died' && sortOrder === 'desc',
                  })}
                />
              </span>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {humans.map(human => (
          <tr
            data-cy="person"
            key={human.slug}
            className={classNames({
              'has-background-warning': slug === human.slug,
            })}
          >
            <td>
              <Link
                to={`/people/${human.slug}`}
                className={classNames({ 'has-text-danger': human.sex === 'f' })}
              >
                {human.name}
              </Link>
            </td>

            <td>{human.sex}</td>
            <td>{human.born}</td>
            <td>{human.died}</td>
            <td>
              <PersonLink personName={human.motherName} people={humans} />
            </td>
            <td>
              <PersonLink personName={human.fatherName} people={humans} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
