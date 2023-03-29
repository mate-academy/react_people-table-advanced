/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  selectedPersonSlug: string,
  setSelectedPersonSlug: (slug: string) => void,
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void,
  filteredPeople: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  selectedPersonSlug,
  setSelectedPersonSlug,
  searchParams,
  setSearchParams,
  filteredPeople,
}) => {
  const [sortedPeople, setSortedPeople] = useState(filteredPeople);

  const sortParam = searchParams.get('sort');
  const sortOrderParam = searchParams.get('order');

  useEffect(() => {
    setSortedPeople(filteredPeople);
  }, [filteredPeople]);

  const sortPeople = (sortBy: string) => {
    if (sortParam !== sortBy && !sortOrderParam) {
      searchParams.set('sort', sortBy);
      searchParams.delete('order');
      setSearchParams(searchParams);
      setSortedPeople(filteredPeople.sort(
        (a, b) => a.name.localeCompare(b.name),
      ));
    } else if (sortParam === sortBy && !sortOrderParam) {
      searchParams.set('order', 'desc');
      setSearchParams(searchParams);
      setSortedPeople(filteredPeople.sort(
        (a, b) => a.name.localeCompare(b.name),
      ).reverse());
    } else if (sortParam === sortBy && sortOrderParam) {
      searchParams.delete('sort');
      searchParams.delete('order');
      setSearchParams(searchParams);
      setSortedPeople(filteredPeople);
    }
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
              <button
                type="button"
                onClick={() => sortPeople('name')}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <button
                onClick={() => sortPeople('sex')}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <button
                onClick={() => sortPeople('born')}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <button
                onClick={() => sortPeople('died')}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </button>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {(sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn(
              { 'has-background-warning': selectedPersonSlug === person.slug },
            )}
          >
            <td>
              <a
                className={cn(
                  { 'has-text-danger': person.sex === 'f' },
                )}
                href={`#/people/${person.slug}`}
                onClick={() => setSelectedPersonSlug(person.slug)}
              >
                {person.name}
              </a>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              <a
                className={cn(
                  { 'has-text-danger': person.mother },
                  { 'has-text-black': !person.mother },
                )}
                href={`#/people/${person.mother?.slug}`}
                onClick={() => setSelectedPersonSlug(person.mother?.slug || '')}
              >
                {person.motherName || '-'}
              </a>
            </td>

            <td>
              <a
                className={cn(
                  { 'has-text-black': !person.father },
                )}
                href={`#/people/${person.father?.slug}`}
                onClick={() => setSelectedPersonSlug(person.father?.slug || '')}
              >
                {person.fatherName || '-'}
              </a>
            </td>
          </tr>
        )))}
      </tbody>
    </table>
  );
};
