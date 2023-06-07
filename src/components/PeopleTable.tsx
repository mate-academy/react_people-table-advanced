import { useState } from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from '../PersonLink';
import { Icon } from './icon';

type Props = {
  activePerson: Person | null,
  setActivePerson(person: Person): void,
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  activePerson,
  setActivePerson,
  people,
}) => {
  const [visiblePeople, setVisiblePeople] = useState(people);
  const [nameSortType, setNameSortType] = useState('default');

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
                onClick={() => {
                  if (nameSortType === 'default') {
                    setVisiblePeople([...people].sort(
                      (a, b) => a.name.localeCompare(b.name),
                    ));
                    setNameSortType('asc');
                  }

                  if (nameSortType === 'asc') {
                    setVisiblePeople([...people].sort(
                      (a, b) => b.name.localeCompare(a.name),
                    ));
                    setNameSortType('desc');
                  }

                  if (nameSortType === 'desc') {
                    setVisiblePeople([...people]);
                    setNameSortType('default');
                  }
                }}
              >
                <Icon sortType={nameSortType} />
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames(
              '',
              {
                'has-background-warning':
                person.slug === activePerson?.slug,
              },
            )}
          >
            <td>
              <PersonLink
                person={person}
                name={person.name}
                sex={person.sex}
                setActivePerson={setActivePerson}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName
                && people.find(woman => woman.name === person.motherName) && (
                <PersonLink
                  person={people.find(
                    woman => woman.name === person.motherName,
                  )}
                  name={person.motherName}
                  sex="f"
                  setActivePerson={setActivePerson}
                />
              )}

              {person.motherName
                && !people.find(
                  woman => woman.name === person.motherName,
                ) && (
                `${person.motherName}`
              )}

              {!person.motherName
                && !people.find(
                  woman => woman.name === person.motherName,
                ) && (
                '-'
              )}
            </td>
            <td>
              {person.fatherName
                && people.find(man => man.name === person.fatherName) && (
                <PersonLink
                  person={people.find(man => man.name === person.fatherName)}
                  name={person.fatherName}
                  sex="m"
                  setActivePerson={setActivePerson}
                />
              )}

              {person.fatherName
                && !people.find(man => man.name === person.fatherName) && (
                `${person.fatherName}`
              )}

              {!person.fatherName
                && !people.find(man => man.name === person.fatherName) && (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
