import { useState, useEffect, useMemo } from 'react';
import { Person } from '../types';
import { getPeople, matchParents } from '../utils';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { usePeopleListContext } from '../context/PeopleListContext';
import { Sex } from '../types/SexFilter';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const { sexFilter, query, centuriesFilter } = usePeopleListContext();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(false);

      try {
        setIsLoading(true);
        const response = await getPeople();
        const peopleWithParents = matchParents(response as Person[]);

        setPeople(peopleWithParents);
      } catch (error) {
        setShowError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const peopleToRender = useMemo(() => {
    let filteredPeople = people?.filter(person => {
      switch (sexFilter) {
        case null:
          return person;
        case Sex.MALE:
          return person.sex === Sex.MALE;
        case Sex.FEMALE:
          return person.sex === Sex.FEMALE;
        default:
          return person;
      }
    });

    if (query) {
      filteredPeople = filteredPeople?.filter(person => {
        const name = person.name.toLocaleLowerCase();
        const motherName = person.motherName?.toLocaleLowerCase();
        const fatherName = person.fatherName?.toLocaleLowerCase();
        const searchedQuery = query.toLocaleLowerCase().trim();

        if (name.includes(query)
          || motherName?.includes(searchedQuery)
          || fatherName?.includes(searchedQuery)) {
          return true;
        }

        return false;
      });
    }

    if (centuriesFilter.length) {
      filteredPeople = filteredPeople?.filter(person => {
        const century = Math.ceil(person.died / 100);

        return centuriesFilter.includes(String(century));
      });
    }

    return filteredPeople;
  }, [centuriesFilter, people, query, sexFilter]);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {showError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people !== null && !people.length && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {/* <p>There are no people matching the current search criteria</p> */}

        {
          peopleToRender && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {
                  peopleToRender.map(person => (
                    <PersonLink key={person.slug} person={person} />
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>
    </div>
  );
};
