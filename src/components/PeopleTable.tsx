import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: activePerson } = useParams();
  const [searchParams] = useSearchParams();

  const visiblePeople = useMemo(() => {
    const centuries = searchParams.getAll('centuries');
    const sex = searchParams.get('sex');
    const query = searchParams.get('query')?.toLocaleLowerCase();
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    let newPeople = [...people];

    if (centuries.length) {
      newPeople = newPeople.filter(p =>
        centuries.includes(`${Math.ceil(p.born / 100)}`),
      );
    }

    if (sex) {
      newPeople = newPeople.filter(p => p.sex === sex);
    }

    if (query) {
      newPeople = newPeople.filter(
        p =>
          p.name.toLocaleLowerCase().includes(query) ||
          p.fatherName?.toLocaleLowerCase().includes(query) ||
          p.motherName?.toLocaleLowerCase().includes(query),
      );
    }

    if (sort) {
      switch (sort) {
        case 'name':
          // eslint-disable-next-line max-len, prettier/prettier
          newPeople = newPeople.sort((p1, p2) =>
            p1.name.localeCompare(p2.name),
          );
          break;
        case 'sex':
          newPeople = newPeople.sort((p1, p2) => p1.sex.localeCompare(p2.sex));
          break;
        case 'born':
          newPeople = newPeople.sort((p1, p2) => p1.born - p2.born);
          break;
        case 'died':
          newPeople = newPeople.sort((p1, p2) => p1.died - p2.died);
          break;
      }
    }

    return order === 'desc' ? newPeople.reverse() : newPeople;
  }, [people, searchParams]);

  function changeSortParams(v: string) {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sort !== v) {
      return { sort: v, order: null };
    } else if (!order) {
      return { order: 'desc', sort };
    } else {
      return { sort: null, order: null };
    }
  }

  function getSortLinkClass(name: string) {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    let className = '';

    if (name !== sort) {
      className = 'fas fa-sort';
    } else if (!order) {
      className = 'fas fa-sort-up';
    } else {
      className = 'fas fa-sort-down';
    }

    return className;
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
              <SearchLink params={changeSortParams('name')}>
                <span className="icon">
                  <i className={getSortLinkClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={changeSortParams('sex')}>
                <span className="icon">
                  <i className={getSortLinkClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={changeSortParams('born')}>
                <span className="icon">
                  <i className={getSortLinkClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={changeSortParams('died')}>
                <span className="icon">
                  <i className={getSortLinkClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(p => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = p;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': activePerson === slug,
              })}
            >
              <td>
                <PersonLink person={p} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                <PersonLink person={mother ?? motherName} />
              </td>
              <td>
                <PersonLink person={father ?? fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
