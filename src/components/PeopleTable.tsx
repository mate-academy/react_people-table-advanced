import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PeopleLink } from './PeopleLink';
import { PeopleSort } from './PeopleSort';

type Props = {
  people?: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const { slug: id } = useParams();
  const { sort, order, handleSort } = PeopleSort();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (id) {
      setSelectedSlug(id);
    }
  }, [id]);

  const renderparents = (name?: string | null) => {
    if (!name) {
      return '-';
    }

    const p = people?.find(x => x.name === name);

    if (p) {
      return <PeopleLink person={p} name={name} />;
    }

    return <span>{name}</span>;
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
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('name')}
            >
              Name
              <span className="icon">
                <i
                  className={
                    sort === 'name'
                      ? order === 'desc'
                        ? 'fas fa-sort-down'
                        : 'fas fa-sort-up'
                      : 'fas fa-sort'
                  }
                />
              </span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('sex')}
            >
              Sex
              <span className="icon">
                <i
                  className={
                    sort === 'sex'
                      ? order === 'desc'
                        ? 'fas fa-sort-down'
                        : 'fas fa-sort-up'
                      : 'fas fa-sort'
                  }
                />
              </span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('born')}
            >
              Born
              <span className="icon">
                <i
                  className={
                    sort === 'born'
                      ? order === 'desc'
                        ? 'fas fa-sort-down'
                        : 'fas fa-sort-up'
                      : 'fas fa-sort'
                  }
                />
              </span>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('died')}
            >
              Died
              <span className="icon">
                <i
                  className={
                    sort === 'died'
                      ? order === 'desc'
                        ? 'fas fa-sort-down'
                        : 'fas fa-sort-up'
                      : 'fas fa-sort'
                  }
                />
              </span>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
            onClick={() => setSelectedSlug(person.slug)}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: searchParams.toString(),
                }}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderparents(person.motherName)}</td>
            <td>{renderparents(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
