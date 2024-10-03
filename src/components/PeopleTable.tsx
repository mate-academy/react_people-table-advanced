import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { Gender } from '../utils/sex';
import { useState, useMemo } from 'react';
import { getSortedPeople, getSortIconClass } from '../utils/sortingUtils';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug?: string }>();
  const location = useLocation();
  const [sortKey, setSortKey] = useState<keyof Person | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');

  const findSlugByName = (name: string | undefined) =>
    people.find(person => person.name === name)?.slug || '';

  const sortedPeople = useMemo(
    () => getSortedPeople(people, sortKey, sortOrder),
    [people, sortKey, sortOrder],
  );

  const handleSort = (key: keyof Person) => {
    if (sortKey === key) {
      const newOrder = sortOrder === 'asc' ? 'desc' : '';

      setSortOrder(newOrder);
      if (newOrder === '') {
        setSortKey('');
      }
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getSortLink = (key: keyof Person) => {
    const params = new URLSearchParams(location.search);

    if (sortKey === key) {
      if (params.get('order') === 'desc') {
        params.delete('sort');
        params.delete('order');
      } else {
        params.set('order', 'desc');
      }
    } else {
      params.set('sort', key);
      params.delete('order');
    }

    return `${location.pathname}?${params.toString()}`;
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
              <Link to={getSortLink('name')} onClick={() => handleSort('name')}>
                <span className="icon">
                  <i className={getSortIconClass('name', sortKey, sortOrder)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={getSortLink('sex')} onClick={() => handleSort('sex')}>
                <span className="icon">
                  <i className={getSortIconClass('sex', sortKey, sortOrder)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={getSortLink('born')} onClick={() => handleSort('born')}>
                <span className="icon">
                  <i className={getSortIconClass('born', sortKey, sortOrder)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={getSortLink('died')} onClick={() => handleSort('died')}>
                <span className="icon">
                  <i className={getSortIconClass('died', sortKey, sortOrder)} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const motherSlug = findSlugByName(person.motherName || '');
          const fatherSlug = findSlugByName(person.fatherName || '');

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}?${location.search}`}
                  className={cn({
                    'has-text-danger': person.sex === Gender.Female,
                  })}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  motherSlug ? (
                    <Link
                      className="has-text-danger"
                      to={`/people/${motherSlug}?${location.search}`}
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  fatherSlug ? (
                    <Link to={`/people/${fatherSlug}?${location.search}`}>
                      {person.fatherName}
                    </Link>
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
