import React from 'react';
import { Person } from '../types';
import { Person as PersonComponent } from './Person';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { isSortKey, SortKey } from '../types/SortKey';
import cn from 'classnames';

interface PeopleProps {
  people: Person[];
}

const headers = [
  { key: 'name', title: 'Name' },
  { key: 'sex', title: 'Sex' },
  { key: 'born', title: 'Born' },
  { key: 'died', title: 'Died' },
  { key: 'mother', title: 'Mother' },
  { key: 'father', title: 'Father' },
] as const;

function updateSortParams(
  params: URLSearchParams,
  sortKey: SortKey,
  currentSort: string | null,
  currentOrder: string | null,
) {
  if (sortKey !== currentSort) {
    params.set('sort', sortKey);
    params.delete('order');

    return;
  }

  if (!currentOrder) {
    params.set('order', 'desc');

    return;
  }

  params.delete('sort');
  params.delete('order');
}

export const People: React.FC<PeopleProps> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  function getSortIcon(key: SortKey) {
    if (currentSort !== key) {
      return 'fa-sort';
    }

    return currentOrder ? 'fa-sort-down' : 'fa-sort-up';
  }

  function getSortLink(sortKey: SortKey) {
    const params = new URLSearchParams(searchParams);

    updateSortParams(params, sortKey, currentSort, currentOrder);

    return {
      pathname: `/people${slug ? `/${slug}` : ''}`,
      search: params.toString(),
    };
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header.key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header.title}
                {isSortKey(header.key) && (
                  <Link to={getSortLink(header.key)}>
                    <span className="icon">
                      <i className={cn('fas', getSortIcon(header.key))} />
                    </span>
                  </Link>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonComponent
            key={person.slug}
            person={person}
            active={slug === person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
