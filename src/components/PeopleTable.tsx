import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchParams } from '../utils/searchHelper';
import { PersonInfo } from './PersonInfo';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  selectedSlug: string;
}

type CallBack = (person1: Person, person2: Person) => number;

const sortPeople = (
  people: Person[], sortBy: string, order: string | null,
) => {
  const callback: CallBack = (person1, person2) => {
    switch (sortBy) {
      case 'sex':
      case 'name':
        return order === 'desc'
          ? person2[sortBy].localeCompare(person1[sortBy])
          : person1[sortBy].localeCompare(person2[sortBy]);

      case 'born':
      case 'died':
        return order === 'desc'
          ? +person2[sortBy] - +person1[sortBy]
          : +person1[sortBy] - +person2[sortBy];

      default:
        return 0;
    }
  };

  return people.sort(callback);
};

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
  const isSelected = (person: Person) => selectedSlug === person.slug;
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return people;
    }

    return sortPeople(people, sort, order);
  }, [sort, order, people]);

  const getSearchParam: (parametr: string) => SearchParams = (parametr) => {
    if (!sort) {
      return { sort: parametr, order: null };
    }

    if (sort !== parametr) {
      return { sort: parametr, order: null };
    }

    if (sort === parametr && !order) {
      return { order: 'desc', sort: parametr };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(parametr => (
            <th key={parametr}>
              <span className="is-flex is-flex-wrap-nowrap">
                {parametr}
                <SearchLink
                  params={getSearchParam(parametr.toLowerCase())}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        'fas',
                        { 'fa-sort': sort !== parametr },
                        {
                          'fa-sort-up':
                          sort === parametr.toLowerCase() && !order,
                        },
                        {
                          'fa-sort-down':
                          sort === parametr.toLowerCase() && order,
                        },
                      )}
                    />
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
        {sortedPeople.map(person => (
          <PersonInfo
            person={person}
            key={person.slug}
            isSelected={isSelected(person)}
          />
        ))}
      </tbody>
    </table>
  );
};
