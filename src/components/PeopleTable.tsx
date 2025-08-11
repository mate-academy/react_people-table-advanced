import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import classNames from 'classnames';
import { PeopleContext } from '../store/PeopleContext';

type Props = {
  people: Person[];
  criteria: string;
  filteredPeople: Person[];
  visiblePeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { setSortCriteria, sortPeople, visiblePeople } =
    useContext(PeopleContext);
  const { slug } = useParams();
  const selectedPerson = slug ? slug : '';

  const getPerson = (persons: Person[], personName: string) => {
    return persons.find(person => person.name === personName) || null;
  };

  const handleSort = (criteria: keyof Person) => {
    setSortCriteria(criteria);
    sortPeople(criteria);
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr key="header-row">
          {people && people.length > 0 ? (
            Object.keys(people[0])
              .slice(0, 6)
              .map((key, index, array) => (
                <th key={`header-${key}`}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {index >= array.length - 2
                      ? capitalizeFirstLetter(key).slice(0, 6)
                      : capitalizeFirstLetter(key)}
                    <a
                      href={`#/people?sort=${key}`}
                      onClick={e => {
                        e.preventDefault();
                        handleSort(key as keyof Person);
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort':
                              key === 'name' ||
                              key === 'sex' ||
                              key === 'born' ||
                              key === 'died',
                          })}
                        />
                      </span>
                    </a>
                  </span>
                </th>
              ))
          ) : (
            <th colSpan={6}>No Data Available</th>
          )}
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <tr
            key={person.slug || person.name}
            data-cy="person"
            className={classNames({
              'has-background-warning': selectedPerson === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                getPerson(people, person.motherName) ? (
                  <PersonLink person={getPerson(people, person.motherName)} />
                ) : (
                  <span>{person.motherName}</span>
                )
              ) : (
                <span>-</span>
              )}
            </td>
            <td>
              {person.fatherName ? (
                getPerson(people, person.fatherName) ? (
                  <PersonLink person={getPerson(people, person.fatherName)} />
                ) : (
                  <span>{person.fatherName}</span>
                )
              ) : (
                <span>-</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
