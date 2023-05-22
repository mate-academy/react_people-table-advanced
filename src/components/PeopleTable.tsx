import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { PersonalInfo } from './PersonalInfo';

type Props = {
  people: Person[];
  serchParams: URLSearchParams,
};

export const PeopleTable: React.FC<Props> = ({ people, serchParams }) => {
  const sort = serchParams.get('sort') || '';
  const order = serchParams.get('order') || '';

  let visiblePeople = [...people];

  if (sort) {
    visiblePeople = visiblePeople.sort((prevPerson, currentPerson) => {
      switch (sort) {
        case 'name':
          return prevPerson.name.localeCompare(currentPerson.name);
        case 'sex':
          return prevPerson.sex.localeCompare(currentPerson.sex);
        case 'born':
          return prevPerson.born - currentPerson.born;
        case 'died':
          return prevPerson.died - currentPerson.died;
        default:
          return 0;
      }
    });

    if (order) {
      visiblePeople = visiblePeople.reverse();
    }
  }

  const linkSortUrl = (filterValue: string) => {
    if (sort === filterValue && !order) {
      return {
        search: getSearchWith(serchParams, { order: 'desk' }),
      };
    }

    if (sort === filterValue && !!order) {
      return {
        search: getSearchWith(serchParams, { sort: null, order: null }),
      };
    }

    return {
      search: getSearchWith(serchParams, { sort: filterValue }),
    };
  };

  const parent = (parentName: string | null) => people
    .find(personItem => personItem.name === parentName);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(filterValue => (
            <th key={filterValue}>
              <span className="is-flex is-flex-wrap-nowrap">
                {filterValue}
                <Link to={linkSortUrl(filterValue.toLocaleLowerCase())}>
                  <span className="icon">
                    <i
                      className={sort !== filterValue.toLocaleLowerCase()
                        ? 'fas fa-sort'
                        : classNames(
                          'fas',
                          { 'fa-sort': !sort },
                          { 'fa-sort-up': !!sort && !order },
                          { 'fa-sort-down': order === 'desk' && !!order },
                        )}
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
        {visiblePeople.map(person => (
          <PersonalInfo
            key={person.slug}
            person={person}
            mother={parent(person.motherName)}
            father={parent(person.fatherName)}
          />
        ))}
      </tbody>
    </table>
  );
};
