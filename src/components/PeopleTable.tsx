/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { CompletePerson } from '../types';
import { PersonLink } from './PersonLink';
import { SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  peopleList: CompletePerson[];
  searchParams: URLSearchParams;
};

enum SortableKeys {
  name = 'name',
  sex = 'sex',
  born = 'born',
  died = 'died',
}

export const PeopleTable: React.FC<Props> = ({ peopleList, searchParams }) => {
  const [newList, setNewList] = useState<CompletePerson[]>([]);
  const [className, setClassName] = useState('fas fa-sort');

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortableKeys = Object.keys(SortableKeys);

  useEffect(() => {
    setNewList(peopleList);
  }, [peopleList]);

  const paramsFunction = (key: string) => {
    const params: SearchParams = { sort, order };

    if (key === sort) {
      if (order) {
        params.sort = null;
        params.order = null;
      } else {
        params.order = 'desc';
      }
    } else {
      params.sort = key;
      params.order = null;
    }

    return params;
  };

  const sortListFunc = () => {
    const compare = (a: CompletePerson, b: CompletePerson, key: string) => {
      if (key === SortableKeys.name || key === SortableKeys.sex) {
        return a[key].localeCompare(b[key]);
      }

      if (key === SortableKeys.born || key === SortableKeys.died) {
        return a[key] - b[key];
      }

      return 0;
    };

    if (sort !== '' && order === '') {
      setClassName('fas fa-sort-up');

      setNewList(currentList => {
        const sortedList = [...currentList].sort((a, b) => {
          return compare(a, b, sort);
        });

        return sortedList;
      });
    }

    if (sort !== '' && order === 'desc') {
      setClassName('fas fa-sort-down');

      setNewList(currentList => {
        const sortedList = [...currentList].sort((a, b) => {
          return -compare(a, b, sort);
        });

        return sortedList;
      });
    }

    if (sort === '' && order === '') {
      setClassName('fas fa-sort');
      setNewList(peopleList);
    }
  };

  useEffect(() => {
    sortListFunc();
  }, [sort, order, newList]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortableKeys.map(key => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                <SearchLink params={paramsFunction(key)}>
                  <span className="icon">
                    <i className={sort === key ? className : `fas fa-sort`} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {newList.map(person => (
          <PersonLink person={person} key={person.name} />
        ))}
      </tbody>
    </table>
  );
};
