import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { SortType } from '../../types/SortType';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort: SortType = searchParams.get('sort') as SortType;
  const order = searchParams.get('order');

  const sortByFields = (person1: Person, person2: Person) => {
    if (!sort) {
      return 0;
    }

    let result = 0;

    switch (sort) {
      case 'name':
      case 'sex':
        result = person1[sort].localeCompare(person2[sort]);
        break;

      case 'born':
      case 'died':
        result = person1[sort] - person2[sort];
        break;
    }

    if (order === 'desc') {
      return 0 - result;
    }

    return result;
  };

  const getParamsForSort = (fieldName: string) => ({
    sort: sort === fieldName && order === 'desc' ? null : fieldName,
    order: sort === fieldName && order !== 'desc' ? 'desc' : null,
  });

  const getClassForField = (fieldName: string) =>
    classNames('fas', {
      'fa-sort': sort !== fieldName,

      'fa-sort-up': sort === fieldName && order !== 'desc',

      'fa-sort-down': sort === fieldName && order === 'desc',
    });

  const findPerson = (personName: string) => {
    const foundPerson = people.find(person => person.name === personName);

    return foundPerson ? <PersonLink person={foundPerson} /> : personName;
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
              <SearchLink params={getParamsForSort('name')}>
                <span className="icon">
                  <i className={getClassForField('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getParamsForSort('sex')}>
                <span className="icon">
                  <i className={getClassForField('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getParamsForSort('born')}>
                <span className="icon">
                  <i className={getClassForField('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getParamsForSort('died')}>
                <span className="icon">
                  <i className={getClassForField('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.sort(sortByFields).map(person => {
          const { sex, born, died, motherName, fatherName } = person;

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
              key={person.slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{motherName ? findPerson(motherName) : '-'}</td>
              <td>{fatherName ? findPerson(fatherName) : '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
