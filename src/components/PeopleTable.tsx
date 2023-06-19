import React, {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

const filterParams
= [{ Name: 'name' }, { Sex: 'sex' }, { Born: 'born' }, { Died: 'died' }];

type Props = {
  people: Person[]
  selectedUser: string
};

export const PeopleTable:FC<Props>
= React.memo(({ people, selectedUser }) => {
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || null;
  const centuries
  = useMemo(() => searchParams.getAll('centuries'), [searchParams]);
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const peopleWithParents = useMemo(() => people.map(human => {
    const humanFather = people.find(man => man.name === human.fatherName);
    const humanMother = people.find(man => man.name === human.motherName);

    const updatedHuman = { ...human };

    if (humanFather) {
      updatedHuman.father = humanFather;
    }

    if (humanMother) {
      updatedHuman.mother = humanMother;
    }

    return updatedHuman;
  }), [people]);

  useEffect(() => {
    if (peopleWithParents) {
      let filter = [...peopleWithParents];

      if (sex) {
        filter = filter.filter(person => person.sex === sex);
      }

      if (query) {
        filter = filter
          .filter(person => {
            const queryToLowerCase = query.toLowerCase();
            const nameToLowerCase = person.name.toLowerCase();
            const fatherToLowerCase = person.fatherName?.toLowerCase();
            const motherToLowerCase = person.motherName?.toLocaleLowerCase();

            if (nameToLowerCase.includes(queryToLowerCase)
            || fatherToLowerCase?.includes(queryToLowerCase)
            || motherToLowerCase?.includes(queryToLowerCase)) {
              return true;
            }

            return false;
          });
      }

      if (centuries.length) {
        filter = filter.filter(person => {
          const { born } = person;

          const centuryOfPersonBorn = Math.floor((born - 1) / 100) + 1;

          if (centuries.includes(`${centuryOfPersonBorn}`)) {
            return true;
          }

          return false;
        });
      }

      if (sort) {
        filter.sort((a, b) => {
          switch (sort) {
            case 'name':
            case 'sex':
              return a[sort].localeCompare(b[sort]);
            case 'born':
            case 'died':
              return a[sort] - b[sort];
            default:
              return 0;
          }
        });

        if (order) {
          filter.reverse();
        }
      }

      setFilteredPeople(filter);
    }
  }, [people, searchParams]);

  return (
    <>
      {filteredPeople.length ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {filterParams.map(param => {
                const name = Object.keys(param)[0];
                const value = Object.values(param)[0];

                return (
                  <th key={value}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {name}
                      <SearchLink
                        params={{
                          sort: (sort === value && order) ? null : value,
                          order: (sort === value && !order) ? 'desc' : null,
                        }}
                      >
                        <span className="icon">
                          <i className={cn(
                            { 'fas fa-sort': sort !== value },
                            { 'fas fa-sort-up': sort === value && !order },
                            { 'fas fa-sort-down': sort === value && order },
                          )}
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
            {filteredPeople
              .map(person => (
                <PersonLink
                  key={person.name}
                  person={person}
                  selectedUser={selectedUser}
                />
              ))}
          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
});
