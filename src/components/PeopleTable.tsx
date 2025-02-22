import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { useMemo, useState } from 'react';
import { getSortedPeople } from '../utils/sortingUtils';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug?: string }>();

  const [sortBy, setSortBy] = useState<keyof Person | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const location = useLocation();

  const findSlugByName = (name: string | undefined) =>
    people.find(person => person.name === name)?.slug || '';

  const sortedPeople = useMemo(
    () => getSortedPeople(people, sortBy, sortOrder),
    [people, sortBy, sortOrder],
  );

  const handlSortBy = (key: keyof Person) => {
    if (sortBy === key) {
      setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : ''));

      if (sortOrder === 'desc') {
        setSortBy('');
      }
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const getSortLink = (key: keyof Person) => {
    const params = new URLSearchParams(location.search);

    if (sortBy === key) {
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

  function getSortArrows(target: keyof Person) {
    if (sortBy !== target) {
      return 'fas fa-sort';
    }

    switch (sortOrder) {
      case '':
        return 'fas fa-sort';
      case 'asc':
        return 'fas fa-sort-up';
      case 'desc':
        return 'fas fa-sort-down';
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
              <Link
                to={getSortLink('name')}
                onClick={() => handlSortBy('name')}
              >
                <span className="icon">
                  <i className={getSortArrows('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={getSortLink('sex')} onClick={() => handlSortBy('sex')}>
                <span className="icon">
                  <i className={getSortArrows('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={getSortLink('born')}
                onClick={() => handlSortBy('born')}
              >
                <span className="icon">
                  <i className={getSortArrows('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={getSortLink('died')}
                onClick={() => handlSortBy('died')}
              >
                <span className="icon">
                  <i className={getSortArrows('died')} />
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
              data-cy="person"
              key={person.slug}
              className={cn({ 'has-background-warning': person.slug === slug })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}?${location.search}`}
                  className={cn({ 'has-text-danger': person.sex === 'f' })}
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
