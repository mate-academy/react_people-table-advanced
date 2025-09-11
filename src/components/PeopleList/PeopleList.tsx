import React, { useMemo } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import { Person } from '../../types';
import { PersonRow } from '../PersonRow/PersonRow';
import classNames from 'classnames';

type Props = {
  peopleList: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';

  const modifiedPeopleList = useMemo(() => {
    const withParents = peopleList.map(person => {
      const father = peopleList.find(p => p.name === person.fatherName);
      const mother = peopleList.find(p => p.name === person.motherName);

      return {
        ...person,
        father,
        mother,
      };
    });

    if (!sortBy) {
      return withParents;
    }

    return [...withParents].sort((a, b) => {
      let valueA: string | number = '';
      let valueB: string | number = '';

      switch (sortBy) {
        case 'name':
          valueA = a.name;
          valueB = b.name;
          break;
        case 'sex':
          valueA = a.sex;
          valueB = b.sex;
          break;
        case 'born':
          valueA = a.born;
          valueB = b.born;
          break;
        case 'died':
          valueA = a.died;
          valueB = b.died;
          break;
        default:
          return 0;
      }

      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      }

      if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }, [peopleList, sortBy, order]);

  const getSortLink = (field: string) => {
    const params = new URLSearchParams(searchParams);

    const currentSort = params.get('sort');
    const currentOrder = params.get('order') || 'asc';

    if (currentSort === field) {
      params.set('order', currentOrder === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('sort', field);
      params.set('order', 'asc');
    }

    return `?${params.toString()}`;
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
              <NavLink to={getSortLink('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'name',
                      'fa-sort-up': sortBy === 'name' && order === 'asc',
                      'fa-sort-down': sortBy === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <NavLink to={getSortLink('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'sex',
                      'fa-sort-up': sortBy === 'sex' && order === 'asc',
                      'fa-sort-down': sortBy === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <NavLink to={getSortLink('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'born',
                      'fa-sort-up': sortBy === 'born' && order === 'asc',
                      'fa-sort-down': sortBy === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <NavLink to={getSortLink('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'died',
                      'fa-sort-up': sortBy === 'died' && order === 'asc',
                      'fa-sort-down': sortBy === 'died' && order === 'desc',
                    })}
                  />
                </span>
              </NavLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {modifiedPeopleList.map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
