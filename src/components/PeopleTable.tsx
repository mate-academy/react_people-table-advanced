import React, { useMemo } from 'react';
import { PersonType } from '../types';
import { PersonLink } from './Person';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: PersonType[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const usePeople = useMemo(() => {
    let filteredPeople = [...people];

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter(person => {
        const century = Math.floor(person.born / 100) + 1;

        return centuries.includes(century.toString());
      });
    }

    if (query) {
      filteredPeople = filteredPeople.filter(person =>
        person.name.toLowerCase().includes(query),
      );
    }

    if (sort && order) {
      switch (sort) {
        case 'name':
          filteredPeople.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'sex':
          filteredPeople.sort((a, b) => a.sex.localeCompare(b.sex));
          break;
        case 'died':
          filteredPeople.sort((a, b) => a.died - b.died);
          break;
        case 'born':
        default:
          filteredPeople.sort((a, b) => a.born - b.born);
      }

      if (order === 'desc') {
        filteredPeople.reverse();
      }
    }

    return filteredPeople;
  }, [people, sex, centuries, query, sort, order]);

  function getSort(sortType: string): string {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== sortType) {
      return getSearchWith(searchParams, {
        sort: sortType,
        order: 'desc',
      });
    }

    if (currentOrder === 'desc') {
      return getSearchWith(searchParams, {
        sort: sortType,
        order: 'asc',
      });
    }

    return getSearchWith(searchParams, {
      sort: null,
      order: null,
    });
  }

  function getArrows(sortType: string) {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== sortType) {
      return 'fa-sort';
    }

    if (currentOrder === 'desc') {
      return 'fa-sort-down';
    }

    if (currentOrder === 'asc' || currentOrder === null) {
      return 'fa-sort-up';
    }

    return 'fa-sort';
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
              <Link to={`/people?${getSort('name')}`}>
                <span className="icon">
                  <i className={`fas ${getArrows('name')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={`/people?${getSort('sex')}`}>
                <span className="icon">
                  <i className={`fas ${getArrows('sex')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={`/people?${getSort('born')}`}>
                <span className="icon">
                  <i className={`fas ${getArrows('born')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={`/people?${getSort('died')}`}>
                <span className="icon">
                  <i className={`fas ${getArrows('died')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {usePeople.map(person => {
          return (
            <PersonLink key={person.slug} person={person} people={usePeople} />
          );
        })}
      </tbody>
    </table>
  );
};
