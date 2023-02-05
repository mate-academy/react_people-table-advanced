import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonDetails } from './PersonDetails';

import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  filteredPeople: Person[];
  selectedPerson: string;
  sort: string,
  order: string,
  searchParams: URLSearchParams,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  filteredPeople,
  selectedPerson,
  sort,
  order,
  searchParams,
}) => {
  const isSelected = (person: Person) => person.slug === selectedPerson;

  const personParent = (personParentName: string | null) => {
    return people.find(person => person.name === personParentName);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(title => (
            <th key={title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <Link
                  to={{
                    search: getSearchWith(searchParams, {
                      sort: (order && sort === title.toLowerCase())
                        ? null
                        : title.toLowerCase(),
                      order: (!order && sort === title.toLowerCase())
                        ? 'desc'
                        : null,
                    }),
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        'fas',
                        'fa-sort',
                        {
                          'fa-sort-up': !order && sort === title.toLowerCase(),
                        },
                        {
                          'fa-sort-down': order && sort === title.toLowerCase(),
                        },
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
        {filteredPeople.map(person => (
          <PersonDetails
            key={person.name}
            person={person}
            personMother={personParent(person.motherName)}
            personFather={personParent(person.fatherName)}
            isSelected={isSelected}
          />
        ))}
      </tbody>
    </table>
  );
};
