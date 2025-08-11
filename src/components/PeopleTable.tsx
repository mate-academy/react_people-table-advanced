/* eslint-disable jsx-a11y/control-has-associated-label */

import { useMemo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { SortFilterType } from '../types/SortFilterType';

type PeopleTablePros = {
  people: Person[];
};

export const PeopleTable = ({ people }: PeopleTablePros) => {
  const listWithParentsSlug = useMemo(() => {
    return people.map(person => ({
      ...person,
      mother: people.find(item => item.name === person.motherName),
      father: people.find(item => item.name === person.fatherName),
    }));
  }, [people]);

  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const filteredList = useMemo(() => {
    const list = [...listWithParentsSlug];

    if (sortParam === 'name') {
      list.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (orderParam === 'desc') {
          return nameB.localeCompare(nameA);
        }

        return nameA.localeCompare(nameB);
      });
    }

    if (sortParam === 'sex') {
      const sortedList = [...list].sort((a, b) => {
        if (a.sex !== b.sex) {
          return a.sex === 'f' ? -1 : 1;
        }

        return 0;
      });

      if (orderParam === 'desc') {
        return sortedList.reverse();
      }

      return sortedList;
    }

    if (sortParam === 'born') {
      const sortedList = [...list].sort((a, b) => {
        if (a.born !== b.born) {
          return a.born - b.born;
        }

        return 0;
      });

      if (orderParam === 'desc') {
        return sortedList.reverse();
      }

      return sortedList;
    }

    if (sortParam === 'died') {
      const sortedList = [...list].sort((a, b) => {
        if (a.died !== b.died) {
          return a.died - b.died;
        }

        return 0;
      });

      if (orderParam === 'desc') {
        return sortedList.reverse();
      }

      return sortedList;
    }

    return list;
  }, [listWithParentsSlug, sortParam, orderParam]);

  const getNextSortParams = (filter: SortFilterType) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (sortParam !== filter) {
      newParams.set('sort', filter);
      newParams.delete('order');
    } else if (orderParam !== 'desc') {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    if (slug) {
      return `/people/${slug}?${newParams.toString()}`;
    }

    return `/people?${newParams.toString()}`;
  };

  const getSortIcon = (filterType: SortFilterType) => {
    if (sortParam === filterType && orderParam === 'desc') {
      return 'fa-sort-down';
    }

    if (sortParam === filterType) {
      return 'fa-sort-up';
    }

    return 'fa-sort';
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
              <Link to={getNextSortParams('name')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('name')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={getNextSortParams('sex')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('sex')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={getNextSortParams('born')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('born')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={getNextSortParams('died')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('died')}`} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredList.map(person => (
          <PersonLink key={person.name} person={person} />
        ))}
      </tbody>
    </table>
  );
};
