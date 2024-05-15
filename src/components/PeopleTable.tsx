/* eslint-disable @typescript-eslint/indent */
import { useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import PersonLink from './PersonLink';
import classNames from 'classnames';
import { useMemo } from 'react';

type Props = { people: Person[] };
export default function PeopleTable({ people }: Props) {
  const { personSlug } = useParams();
  const [sParams, setSParams] = useSearchParams();

  const currentSort = sParams.get('sort') as
    | 'name'
    | 'sex'
    | 'born'
    | 'died'
    | null;
  const currentOrder = sParams.get('order');

  function handleSort(fieldName: string) {
    if (currentSort === null) {
      sParams.set('sort', fieldName);
    } else if (currentSort !== fieldName) {
      sParams.set('sort', fieldName);
      sParams.delete('order');
    } else if (currentSort === fieldName && currentOrder === null) {
      sParams.set('order', 'desc');
    } else {
      sParams.delete('sort');
      sParams.delete('order');
    }

    setSParams(sParams);
  }

  const sexFilter = sParams.get('sex');
  const nameFilter = sParams.get('name')?.toLowerCase();
  const centuryFilters = sParams.getAll('centuries');

  const displayPeople = useMemo(
    () =>
      people.filter(person => {
        const sexMatches = sexFilter === null || person.sex === sexFilter;
        const nameMatches =
          nameFilter === undefined ||
          person.name.toLowerCase().includes(nameFilter) ||
          person.fatherName?.toLowerCase().includes(nameFilter) ||
          person.motherName?.toLowerCase().includes(nameFilter);
        const centuryMatches =
          centuryFilters.length === 0 ||
          centuryFilters.includes(Math.floor(person.born / 100) + 1 + '');

        return sexMatches && nameMatches && centuryMatches;
      }),
    [centuryFilters, nameFilter, sexFilter, people],
  );

  const sortedPeople = useMemo(() => {
    let tempPeople = displayPeople;

    if (currentSort !== null) {
      tempPeople = displayPeople.sort((a: Person, b: Person) =>
        ['born', 'died'].includes(currentSort)
          ? +a[currentSort] - +b[currentSort]
          : a[currentSort as 'sex' | 'name'].localeCompare(
              b[currentSort as 'sex' | 'name'],
            ),
      );

      if (currentOrder !== null) {
        tempPeople.reverse();
      }
    }

    return tempPeople;
  }, [currentOrder, currentSort, displayPeople]);

  return (
    <div className="column">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {['Name', 'Sex', 'Born', 'Died'].map(fieldName => (
                <th key={fieldName}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {fieldName}
                    <a
                      onClick={() => {
                        handleSort(fieldName.toLowerCase());
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'fa',
                            fieldName.toLowerCase() !== currentSort
                              ? 'fa-sort'
                              : currentOrder === 'desc'
                                ? 'fa-sort-down'
                                : 'fa-sort-up',
                          )}
                        ></i>
                      </span>
                    </a>
                  </span>
                </th>
              ))}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {sortedPeople.map(person => {
              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': personSlug === person.slug,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.mother !== undefined ? (
                      <PersonLink person={person.mother} />
                    ) : person.motherName ? (
                      person.motherName
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {person.father !== undefined ? (
                      <PersonLink person={person.father} />
                    ) : person.fatherName ? (
                      person.fatherName
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
