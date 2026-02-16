import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

const getSortIcon = (active: boolean, desc: boolean) => {
  if (!active) {
    return 'fas fa-sort';
  }

  return desc ? 'fas fa-sort-down' : 'fas fa-sort-up';
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const currentSlug = location.pathname.startsWith('/people/')
    ? decodeURIComponent(location.pathname.replace('/people/', ''))
    : '';

  const sort = searchParams.get('sort') as SortField | null;
  const isDesc = searchParams.get('order') === 'desc';

  const onSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (currentSort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!currentOrder) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const makePersonLink = (slug: string) => ({
    pathname: `/people/${slug}`,
    search: location.search,
  });

  const findByName = (name?: string) => {
    if (!name) {
      return undefined;
    }

    return people.find(p => p.name === name);
  };

  const findBySlug = (slug?: string) => {
    if (!slug) {
      return undefined;
    }

    return people.find(p => p.slug === slug);
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
                className="button is-white is-small"
                onClick={() => onSort('name')}
              >
                <span className="icon">
                  <i
                    className={getSortIcon(
                      sort === 'name',
                      isDesc && sort === 'name',
                    )}
                  />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <button
                type="button"
                className="button is-white is-small"
                onClick={() => onSort('sex')}
              >
                <span className="icon">
                  <i
                    className={getSortIcon(
                      sort === 'sex',
                      isDesc && sort === 'sex',
                    )}
                  />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <button
                type="button"
                className="button is-white is-small"
                onClick={() => onSort('born')}
              >
                <span className="icon">
                  <i
                    className={getSortIcon(
                      sort === 'born',
                      isDesc && sort === 'born',
                    )}
                  />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <button
                type="button"
                className="button is-white is-small"
                onClick={() => onSort('died')}
              >
                <span className="icon">
                  <i
                    className={getSortIcon(
                      sort === 'died',
                      isDesc && sort === 'died',
                    )}
                  />
                </span>
              </button>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const motherName: string | undefined =
            person.motherName ||
            (person.mother && typeof person.mother === 'object'
              ? person.mother.name
              : undefined);

          const motherSlugFromRelation: string | undefined =
            typeof person.mother === 'string'
              ? person.mother
              : person.mother && typeof person.mother === 'object'
                ? person.mother.slug
                : undefined;

          const motherSlug: string | undefined =
            motherSlugFromRelation || findByName(motherName)?.slug;

          const finalMotherName: string | undefined =
            motherName || findBySlug(motherSlug)?.name;

          const fatherName: string | undefined =
            person.fatherName ||
            (person.father && typeof person.father === 'object'
              ? person.father.name
              : undefined);

          const fatherSlugFromRelation: string | undefined =
            typeof person.father === 'string'
              ? person.father
              : person.father && typeof person.father === 'object'
                ? person.father.slug
                : undefined;

          const fatherSlug: string | undefined =
            fatherSlugFromRelation || findByName(fatherName)?.slug;

          const finalFatherName: string | undefined =
            fatherName || findBySlug(fatherSlug)?.name;

          const isSelected = currentSlug === person.slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  to={makePersonLink(person.slug)}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died ?? '-'}</td>

              <td>
                {motherSlug && finalMotherName ? (
                  <Link
                    to={makePersonLink(motherSlug)}
                    className="has-text-danger"
                  >
                    {finalMotherName}
                  </Link>
                ) : finalMotherName ? (
                  <span className="has-text-danger">{finalMotherName}</span>
                ) : (
                  '-'
                )}
              </td>

              <td>
                {fatherSlug && finalFatherName ? (
                  <Link to={makePersonLink(fatherSlug)}>{finalFatherName}</Link>
                ) : finalFatherName ? (
                  finalFatherName
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
