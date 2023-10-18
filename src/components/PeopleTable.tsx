import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const { slugId } = useParams();
  const selectedPerson = people.find(person => person.slug === slugId);

  const getPerson = (name: string | null) => {
    return people.find(person => person.name === name);
  };

  const handleSort = (selectedSort: string) => {
    if (selectedSort !== sort) {
      return {
        sort: selectedSort,
        order: null,
      };
    }

    if (selectedSort === sort && !sortOrder) {
      return {
        sort: selectedSort,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const sortCriteria = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortCriteria.map(criteria => (
            <th key={criteria}>
              <span className="is-flex is-flex-wrap-nowrap">
                {criteria}
                <SearchLink params={handleSort(criteria.toLowerCase())}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== criteria,
                        'fa-sort-up': sort === criteria && !sortOrder,
                        'fa-sort-down': sort === criteria && sortOrder,
                      })}
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
        {people.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
          } = person;

          const mother = getPerson(motherName);
          const father = getPerson(fatherName);

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedPerson === person,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {(mother
                  ? <PersonLink person={mother} />
                  : motherName)
                  || '-'}
              </td>
              <td>
                {(father
                  ? <PersonLink person={father} />
                  : fatherName)
                  || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
