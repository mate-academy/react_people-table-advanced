import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonInfo } from './PersonInfo';
import { Person, SortBy, SortOrder } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { sort } from '../utils/sort';
import { ORDER_KEY, SORT_KEY } from '../utils/constants';

type Props = {
  people: Person[],
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>
};

const tableHeadings = [
  { title: 'Name', sort: true },
  { title: 'Sex', sort: true },
  { title: 'Born', sort: true },
  { title: 'Died', sort: true },
  { title: 'Mother', sort: false },
  { title: 'Father', sort: false },
];

export const PeopleTable: React.FC<Props> = ({
  people,
  setPeople,
}) => {
  const [searchParams] = useSearchParams();

  const getParent = (parentName: string | null) => {
    return people?.find(p => parentName === p.name);
  };

  const sortBy = searchParams.get(SORT_KEY) as SortBy;
  const orderBy = searchParams.get(ORDER_KEY) as SortOrder;

  useEffect(() => {
    if (sortBy) {
      const sortedPeople = sort(people, sortBy, orderBy || 'asc');

      setPeople(sortedPeople);
    }
  }, [sortBy, orderBy]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeadings.map(header => (
            <th key={header.title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header.title}

                {header.sort && (
                  <Link to={{
                    search: getSearchWith(searchParams, {
                      [SORT_KEY]: sortBy === header.title.toLowerCase()
                        && orderBy
                        ? null : header.title.toLowerCase(),
                      [ORDER_KEY]: !orderBy
                        && sortBy === header.title.toLowerCase()
                        ? 'desc' : null,
                    }),
                  }}
                  >
                    <span className="icon">
                      <i className={cn('fas fa-sort', {
                        'fa-sort-up': sortBy && !orderBy
                          && sortBy === header.title.toLowerCase(),
                        'fa-sort-down': sortBy && orderBy
                          && sortBy === header.title.toLowerCase(),
                      })}
                      />
                    </span>
                  </Link>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people?.map(person => {
          const mother = getParent(person.motherName);
          const father = getParent(person.fatherName);

          return (
            <PersonInfo
              key={person.slug}
              person={person}
              mother={mother}
              father={father}
            />
          );
        })}

      </tbody>
    </table>
  );
};
