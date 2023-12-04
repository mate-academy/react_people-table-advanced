import React from 'react';
import classNames from 'classnames';
import { useParams, Link } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import { useSearchParams } from '../utils/useSearchParams';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

export enum SortBy {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: id } = useParams();

  const {
    sex,
    query,
    centuriesUrl,
    searchParams,
  } = useSearchParams();

  const findParent = (parentName: string | null) => {
    const parent = people.find((person) => person.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortByColumn = (column: string) => {
    if (sort !== column) {
      return { sort: column, order: null };
    }

    if (!order) {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const sortPeople = (val: Person[]) => {
    let filteredPeople = val;
    const isReversed: number = order ? -1 : 1;

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      const queryLowerCase = query.toLowerCase();

      filteredPeople = filteredPeople
        .filter(person => person.name.toLowerCase().includes(queryLowerCase)
          || (person.fatherName && person.fatherName.toLowerCase()
            .includes(queryLowerCase))
          || (person.motherName && person.motherName.toLowerCase()
            .includes(queryLowerCase)));
    }

    if (centuriesUrl && centuriesUrl.length > 0) {
      filteredPeople = filteredPeople.filter(person => centuriesUrl
        .includes(Math.ceil(person.born / 100).toString()));
    }

    return filteredPeople.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return (a[sort] as string).localeCompare(b[sort]) * isReversed;
        case 'born':
        case 'died':
          return (+a[sort] - +b[sort]) * isReversed;
        default:
          return 0;
      }
    });
  };

  const sortedPeople = sortPeople(people);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.keys(SortBy).map((sortName: string) => (
            <th key={sortName}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortName}
                <Link
                  to={{
                    search: getSearchWith(
                      searchParams,
                      sortByColumn(sortName.toLowerCase()),
                    ),
                  }}
                  aria-label={`Sort by ${sortName}`}
                >
                  <span className="icon">
                    <i className={classNames('fas fa-sort', {
                      'fa-sort-up': sort === sortName.toLowerCase() && !order,
                      'fa-sort-down': sort === sortName.toLowerCase() && order,
                    })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((person) => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === id,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{findParent(person.motherName)}</td>
            <td>{findParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
