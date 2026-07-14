/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import type { Person } from '../types';
import { PersonLink } from './PersonLink';

type SortOrder = 'asc' | 'desc' | null;
type SortSex = 'asc' | 'desc' | null;
type SortName = 'asc' | 'desc' | null;
interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable = ({ people, selectedSlug }: PeopleTableProps) => {
  const [sortBorn, setSortBorn] = useState<SortOrder>(null);
  const [sortDied, setSortDied] = useState<SortOrder>(null);
  const [sortSex, setSortSex] = useState<SortSex>(null);
  const [sortName, setSortName] = useState<SortName>(null);

  const handleSortName = () => {
    setSortDied(null);
    setSortBorn(null);
    setSortSex(null);
    if (sortName === null) {
      setSortName('asc');
    } else if (sortName === 'asc') {
      setSortName('desc');
    } else if (sortName === 'desc') {
      setSortName(null);
    }
  };

  const handleSortSexTogle = () => {
    setSortDied(null);
    setSortBorn(null);
    setSortName(null);
    if (sortSex === null) {
      setSortSex('asc');
    } else if (sortSex === 'asc') {
      setSortSex('desc');
    } else if (sortSex === 'desc') {
      setSortSex(null);
    }
  };

  const handleSortBornToggle = () => {
    setSortDied(null);
    setSortSex(null);
    setSortName(null);
    if (sortBorn === null) {
      setSortBorn('asc');
    } else if (sortBorn === 'asc') {
      setSortBorn('desc');
    } else if (sortBorn === 'desc') {
      setSortBorn(null);
    }
  };

  const handleSortDiedToggle = () => {
    setSortBorn(null);
    setSortSex(null);
    setSortName(null);
    if (sortDied === null) {
      setSortDied('asc');
    } else if (sortDied === 'asc') {
      setSortDied('desc');
    } else if (sortDied === 'desc') {
      setSortDied(null);
    }
  };

  const sortPeople = (data: Person[]): Person[] => {
    const newPeople = [...data];

    if (sortName === 'asc') {
      return newPeople.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortName === 'desc') {
      return newPeople.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (sortSex === 'asc') {
      return newPeople.sort((a, b) => a.sex.localeCompare(b.sex));
    }

    if (sortSex === 'desc') {
      return newPeople.sort((a, b) => b.sex.localeCompare(a.sex));
    }

    if (sortBorn === 'asc') {
      return newPeople.sort((a, b) => a.born - b.born);
    }

    if (sortBorn === 'desc') {
      return newPeople.sort((a, b) => b.born - a.born);
    }

    if (sortDied === 'asc') {
      return newPeople.sort((a, b) => a.died - b.died);
    }

    if (sortDied === 'desc') {
      return newPeople.sort((a, b) => b.died - a.died);
    }

    return data;
  };

  const sortedPeople = sortPeople(people);

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
              <a
                href="#/people?sort=name"
                onClick={event => {
                  event.preventDefault();
                  handleSortName();
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${
                      sortName === 'asc'
                        ? 'fa-sort-up'
                        : sortName === 'desc'
                          ? 'fa-sort-down'
                          : 'fa-sort'
                    }`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={event => {
                  event.preventDefault();
                  handleSortSexTogle();
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${
                      sortSex === 'asc'
                        ? 'fa-sort-up'
                        : sortSex === 'desc'
                          ? 'fa-sort-down'
                          : 'fa-sort'
                    }`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={event => {
                  event.preventDefault();
                  handleSortBornToggle();
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${
                      sortBorn === 'asc'
                        ? 'fa-sort-up'
                        : sortBorn === 'desc'
                          ? 'fa-sort-down'
                          : 'fa-sort'
                    }`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={event => {
                  event.preventDefault();
                  handleSortDiedToggle();
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${
                      sortDied === 'asc'
                        ? 'fa-sort-up'
                        : sortDied === 'desc'
                          ? 'fa-sort-down'
                          : 'fa-sort'
                    }`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(item => {
          const father = people.find(
            personItem => personItem.name === item.fatherName,
          );

          const mother = people.find(
            personItem => personItem.name === item.motherName,
          );

          return (
            <tr
              data-cy="person"
              key={item.slug}
              className={
                item.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={item} />
              </td>
              <td>{item.sex}</td>
              <td>{item.born}</td>
              <td>{item.died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  item.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  item.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
