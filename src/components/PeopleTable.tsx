/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo } from 'react';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { usePeople } from '../context/PeopleContext';

export const PeopleTable: React.FC = () => {
  const { people } = usePeople();
  const [searchParams] = useSearchParams();

  const makeSortLink = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    let params: { [key: string]: string | null };

    if (currentSort !== field) {
      params = { sort: field, order: null };
    } else if (!currentOrder) {
      params = { sort: field, order: 'desc' };
    } else {
      params = { sort: null, order: null };
    }

    return getSearchWith(searchParams, params);
  };

  const preserveSearch = () => searchParams.toString();

  const getIcon = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      return '/images/sort_both.png';
    }

    if (currentOrder === 'desc') {
      return '/images/sort_desc.png';
    }

    return '/images/sort_asc.png';
  };

  const filtered = useMemo(() => {
    const q = searchParams.get('query')?.trim().toLowerCase() ?? '';
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');

    let res = people.slice();

    if (sex) {
      res = res.filter(p => p.sex === sex);
    }

    if (q) {
      res = res.filter(p => {
        const values: string[] = [
          p.name,
          p.motherName ?? '',
          p.fatherName ?? '',
        ];

        return values.some(v => v.toLowerCase().includes(q));
      });
    }

    if (centuries.length > 0) {
      res = res.filter(p => {
        const century = String(Math.ceil(p.born / 100));

        return centuries.includes(century);
      });
    }

    const sort = searchParams.get('sort');
    const order = searchParams.get('order') === 'desc' ? -1 : 1;

    if (sort) {
      res.sort((a, b) => {
        const av = (a as any)[sort];
        const bv = (b as any)[sort];

        if (typeof av === 'number' && typeof bv === 'number') {
          return (av - bv) * order;
        }

        return String(av).localeCompare(String(bv)) * order;
      });
    }

    return res;
  }, [people, searchParams.toString()]);

  const params = useParams();
  const selectedSlug = params.slug;

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
              <Link to={{ search: makeSortLink('name') }} className="ml-2">
                <img src={getIcon('name')} alt="sort" className="sort-icon" />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: makeSortLink('sex') }} className="ml-2">
                <img src={getIcon('sex')} alt="sort" className="sort-icon" />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: makeSortLink('born') }} className="ml-2">
                <img src={getIcon('born')} alt="sort" className="sort-icon" />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: makeSortLink('died') }} className="ml-2">
                <img src={getIcon('died')} alt="sort" className="sort-icon" />
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filtered.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={
              selectedSlug === person.slug ? 'has-background-warning' : ''
            }
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: preserveSearch(),
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
              {(() => {
                const motherPerson =
                  person.mother ??
                  people.find(p => p.name === person.motherName);

                if (motherPerson) {
                  return (
                    <Link
                      to={{
                        pathname: `/people/${motherPerson.slug}`,
                        search: preserveSearch(),
                      }}
                      className={
                        motherPerson.sex === 'f' ? 'has-text-danger' : ''
                      }
                    >
                      {motherPerson.name}
                    </Link>
                  );
                }

                return person.motherName || '-';
              })()}
            </td>

            <td>
              {(() => {
                const fatherPerson =
                  person.father ??
                  people.find(p => p.name === person.fatherName);

                if (fatherPerson) {
                  return (
                    <Link
                      to={{
                        pathname: `/people/${fatherPerson.slug}`,
                        search: preserveSearch(),
                      }}
                    >
                      {fatherPerson.name}
                    </Link>
                  );
                }

                return person.fatherName || '-';
              })()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
