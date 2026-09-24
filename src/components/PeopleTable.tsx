/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

type Props = {
  persons: Person[];
};

export const PeopleTable: React.FC<Props> = ({ persons }) => {
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');
  const sexParam = searchParams.get('sex');

  const query = searchParams.get('query') || '';
  const centuriesParam = searchParams.getAll('centuries');
  const getCentury = (year: number) => Math.ceil(year / 100);

  const visiblePeople = persons.filter(person => {
    const matchesQuery =
      query === '' ||
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase());

    const matchesCentury =
      centuriesParam.length === 0 ||
      centuriesParam.includes(String(getCentury(person.born)));

    const matchesSex = !sexParam || person.sex === sexParam;

    return matchesQuery && matchesCentury && matchesSex;
  });

  const sortedPeople = [...visiblePeople].sort((a, b) => {
    if (!sortParam) {
      return 0;
    }

    const aValue = a[sortParam as keyof Person];
    const bValue = b[sortParam as keyof Person];

    if (aValue === null || aValue === undefined) {
      return 1;
    }

    if (bValue === null || bValue === undefined) {
      return -1;
    }

    const modifier = orderParam === 'desc' ? -1 : 1;

    if (aValue < bValue) {
      return -1 * modifier;
    }

    if (aValue > bValue) {
      return 1 * modifier;
    }

    return 0;
  });

  const peopleWithParents = sortedPeople.map(person => ({
    ...person,
    mother: visiblePeople.find(p => p.name === person.motherName),
    father: visiblePeople.find(p => p.name === person.fatherName),
  }));

  const getSortLink = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (sortParam === field) {
      if (!orderParam) {
        params.set('sort', field);
        params.set('order', 'desc');

        return { icon: 'fa-sort-up', link: `?${params.toString()}` };
      }

      params.delete('sort');
      params.delete('order');

      return { icon: 'fa-sort-down', link: `?${params.toString()}` };
    }

    params.set('sort', field);
    params.delete('order');

    return { icon: 'fa-sort', link: `?${params.toString()}` };
  };

  const nameSort = getSortLink('name');
  const sexSort = getSortLink('sex');
  const bornSort = getSortLink('born');
  const diedSort = getSortLink('died');

  const { slug } = useParams();
  const selectedSlug = slug;

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
              <Link to={nameSort.link}>
                <span className="icon">
                  <i className={`fas ${nameSort.icon}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={sexSort.link}>
                <span className="icon">
                  <i className={`fas ${sexSort.icon}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={bornSort.link}>
                <span className="icon">
                  <i className={`fas ${bornSort.icon}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={diedSort.link}>
                <span className="icon">
                  <i className={`fas ${diedSort.icon}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleWithParents.map(person => (
          <tr
            data-cy="person"
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
            key={person.slug}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                person.mother ? (
                  <PersonLink person={person.mother} />
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
                  <PersonLink person={person.father} />
                ) : (
                  person.fatherName
                )
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
