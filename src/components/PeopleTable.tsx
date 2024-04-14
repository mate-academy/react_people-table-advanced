import React, { useState } from 'react';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types/Person';

interface Props {
  people: Person[];
  personSlug: string;
}

const TABLE_HEADERS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
const NO_MOTHER = '-';
const NO_FATHER = '-';

const PeopleTable: React.FC<Props> = ({ people, personSlug }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const preparePeopleData = (persons: Person[]) => {
    return persons.map(person => ({
      ...person,
      mother: persons.find(({ name }) => name === person.motherName),
      father: persons.find(({ name }) => name === person.fatherName),
    }));
  };

  const preparedPeople = preparePeopleData(people);

  const sortByName = (list: Person[]) => {
    const sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name));

    if (sortOrder === 'asc') {
      return sortedList;
    } else if (sortOrder === 'desc') {
      return sortedList.reverse();
    }

    return list;
  };

  const sortBySex = (list: Person[]) => {
    const sortedList = [...list].sort((a, b) => a.sex.localeCompare(b.sex));

    if (sortOrder === 'asc') {
      return sortedList;
    } else if (sortOrder === 'desc') {
      return sortedList.reverse();
    }

    return list;
  };

  const sortByDate = (list: Person[], key: 'born' | 'died') => {
    const sortedList = [...list].sort(
      (a, b) => new Date(a[key]).getTime() - new Date(b[key]).getTime(),
    );

    if (sortOrder === 'asc') {
      return sortedList;
    } else if (sortOrder === 'desc') {
      return sortedList.reverse();
    }

    return list;
  };

  const handleSortByHeader = (header: string) => {
    if (sortBy === header) {
      setSortOrder(prevSortOrder => {
        if (prevSortOrder === 'asc') {
          return 'desc';
        }

        if (prevSortOrder === 'desc') {
          return null;
        }

        return 'asc';
      });
    } else {
      setSortOrder('asc');
      setSortBy(header);
    }
  };

  const sortPeople = (list: Person[]) => {
    if (sortBy === 'Name') {
      return sortByName(list);
    } else if (sortBy === 'Sex') {
      return sortBySex(list);
    } else if (sortBy === 'Born') {
      return sortByDate(list, 'born');
    } else if (sortBy === 'Died') {
      return sortByDate(list, 'died');
    }

    return list;
  };

  const getSortIcon = (sorted: string) => {
    if (sortBy === sorted) {
      if (sortOrder === 'asc') {
        return 'fas fa-sort-up';
      } else if (sortOrder === 'desc') {
        return 'fas fa-sort-down';
      }
    }

    return 'fas fa-sort';
  };

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {TABLE_HEADERS.map(header => (
              <th key={header}>
                <span
                  className="is-flex is-flex-wrap-nowrap"
                  onClick={() => handleSortByHeader(header)}
                  style={{ cursor: 'pointer' }}
                >
                  {header}
                  {['Name', 'Sex', 'Born', 'Died'].includes(header) && (
                    <a href={`#/people?sort=${header.toLowerCase()}`}>
                      <span className="icon">
                        <i className={getSortIcon(header)} />
                      </span>
                    </a>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortPeople(preparedPeople).map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother && <PersonLink person={person.mother} />}
                {!person.mother && person.motherName && person.motherName}
                {!person.mother && !person.motherName && NO_MOTHER}
              </td>
              <td>
                {person.father && <PersonLink person={person.father} />}
                {!person.father && person.fatherName && person.fatherName}
                {!person.father && !person.fatherName && NO_FATHER}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PeopleTable;
