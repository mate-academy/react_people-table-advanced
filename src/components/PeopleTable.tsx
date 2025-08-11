// import { useState } from 'react';
import { Link, SetURLSearchParams, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import React from 'react';

type Props = {
  people?: Person[] | null;
  erro: boolean;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export type IconsType = 'normal' | 'up' | 'down';

export default function PeopleTable({
  people,
  erro,
  searchParams,
  setSearchParams,
}: Props) {
  const { personSlug } = useParams();
  const [icon, setIcon] = useState<IconsType>('normal');
  const [sortName, setSortName] = useState('');

  const headersWithIcon = useMemo(() => ['Name', 'Sex', 'Born', 'Died'], []);

  function handleSortCLick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    param: string,
  ) {
    e.preventDefault();

    if (sortName !== param) {
      setSortName(param);
      setIcon('up');

      const search = getSearchWith(searchParams, { sort: param, order: null });

      setSearchParams(search);

      return;
    }

    if (icon === 'normal') {
      setSortName(param);
      setIcon('up');

      const search = getSearchWith(searchParams, { sort: param });

      setSearchParams(search);
    }

    if (icon === 'up') {
      setSortName(param);
      setIcon('down');

      const search = getSearchWith(searchParams, { order: 'desc' });

      setSearchParams(search);
    }

    if (icon === 'down') {
      setSortName(param);
      setIcon('normal');

      const search = getSearchWith(searchParams, { sort: null, order: null });

      setSearchParams(search);
    }
  }

  if (erro) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headersWithIcon.map(header => (
            <th key={header}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header}
                <Link
                  onClick={e => handleSortCLick(e, header.toLowerCase())}
                  to="#"
                >
                  <span className="icon">
                    <i
                      className={`fas fa-sort${icon === 'up' && sortName === header.toLowerCase() ? '-up' : icon === 'down' && sortName === header.toLowerCase() ? '-down' : ''}`}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <>
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person.slug === personSlug ? 'has-background-warning' : ''
              }
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
              <td>
                {person.motherName ? (
                  person.mother ? (
                    <Link
                      className="has-text-danger"
                      to={`/people/${person.mother.slug}`}
                    >
                      {person.mother.name}
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
                  person.father ? (
                    <Link to={`/people/${person.father.slug}`}>
                      {person.father.name}
                    </Link>
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
}
