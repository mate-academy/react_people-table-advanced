// src/components/PeopleTable.tsx (updated with sorting implementation and navigation fixes)

import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  allPeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people, allPeople }) => {
  const [checkedSlug, setCheckedSlug] = useState<string>('');

  const { slug } = useParams();
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setCheckedSlug(slug || '');
  }, [slug]);

  const sort = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  };

  const handleSort = (field: string) => {
    let newOrder: string | null = 'asc';
    let newSort: string | null = field;

    if (sort === field) {
      if (order === 'asc') {
        newOrder = 'desc';
      } else {
        newSort = null;
        newOrder = null;
      }
    }

    setSearchParams(
      getSearchWith(searchParams, { sort: newSort, order: newOrder }),
    );
  };

  return (
    <>
      {people.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <button
                  className="button is-ghost"
                  onClick={() => handleSort('name')}
                >
                  Name
                  <span className="icon">
                    <i className={getSortIcon('name')} />
                  </span>
                </button>
              </th>
              <th>
                <button
                  className="button is-ghost"
                  onClick={() => handleSort('sex')}
                >
                  Sex
                  <span className="icon">
                    <i className={getSortIcon('sex')} />
                  </span>
                </button>
              </th>
              <th>
                <button
                  className="button is-ghost"
                  onClick={() => handleSort('born')}
                >
                  Born
                  <span className="icon">
                    <i className={getSortIcon('born')} />
                  </span>
                </button>
              </th>
              <th>
                <button
                  className="button is-ghost"
                  onClick={() => handleSort('died')}
                >
                  Died
                  <span className="icon">
                    <i className={getSortIcon('died')} />
                  </span>
                </button>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => {
              const mother = allPeople.find(p => p.name === person.motherName);
              const father = allPeople.find(p => p.name === person.fatherName);

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={classNames({
                    'has-background-warning': checkedSlug === person.slug,
                  })}
                >
                  <td>
                    <Link
                      to={`/people/${person.slug}${search}`}
                      className={classNames({
                        'has-text-danger': person.sex === 'f',
                      })}
                    >
                      {person.name}
                    </Link>
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {mother ? (
                      <PersonLink parent={mother} />
                    ) : (
                      person.motherName || '—'
                    )}
                  </td>
                  <td>
                    {father ? (
                      <PersonLink parent={father} />
                    ) : (
                      person.fatherName || '—'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
