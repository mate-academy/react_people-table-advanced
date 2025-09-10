/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
  slug: string | undefined;
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
  const sortFields = [
    { key: 'name', field: 'Name' },
    { key: 'sex', field: 'Sex' },
    { key: 'born', field: 'Born' },
    { key: 'died', field: 'Died' },
  ];

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getNextSort = (key: string) => {
    if (sort !== key) {
      return { sort: key, order: null };
    }

    if (order !== 'desc') {
      return { sort: key, order: 'desc' };
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
          {sortFields.map(({ key, field }) => {
            const next = getNextSort(key);

            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {field}
                  <SearchLink params={next}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== key,
                          'fa-sort-up': sort === key && order !== 'desc',
                          'fa-sort-down': sort === key && order === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const personFather = people.find(p => p.name === person.fatherName);
          const personMother = people.find(p => p.name === person.motherName);

          const completedPerson = {
            ...person,
            father: personFather,
            mother: personMother,
          };

          return (
            <tr
              data-cy="person"
              key={completedPerson.slug}
              className={classNames({
                'has-background-warning': slug === completedPerson.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{completedPerson.sex}</td>
              <td>{completedPerson.born}</td>
              <td>{completedPerson.died}</td>

              <td>
                <PersonLink
                  person={
                    completedPerson.mother
                      ? completedPerson.mother
                      : completedPerson.motherName
                  }
                />
                {/* {completedPerson.personMother ? (
                  <PersonLink person={completedPerson.personMother} />
                ) : (
                  `${completedPerson.motherName ? completedPerson.motherName : '-'}`
                )} */}
              </td>
              <td>
                <PersonLink
                  person={
                    completedPerson.father
                      ? completedPerson.father
                      : completedPerson.fatherName
                  }
                />
                {/* {completedPerson.personFather ? (
                  <PersonLink person={completedPerson.personFather} />
                ) : (
                  `${completedPerson.fatherName ? completedPerson.fatherName : '-'}`
                )} */}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
