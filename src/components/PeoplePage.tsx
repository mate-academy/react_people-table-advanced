import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedSex = params.get('sex');
  const selectedCenturies = params.getAll('centuries');
  const searchQuery = params.get('query')?.trim().toLowerCase();

  useEffect(() => {
    const gettingPeople = async () => {
      try {
        setIsLoading(true);

        const peopleFromServer = await getPeople();

        const peopleToRender = peopleFromServer.map(person => {
          return {
            ...person,
            mother: peopleFromServer
              .find(({ name }) => name === person.motherName),
            father: peopleFromServer
              .find(({ name }) => name === person.fatherName),
          };
        });

        setPeople(peopleToRender);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    gettingPeople();
  }, [location.search]);

  const filteredPeople = people?.filter(person => {
    const sexFilter = !selectedSex || person.sex === selectedSex;

    let centuryFilter = true;

    if (selectedCenturies.length > 0) {
      const birthCentury = Math.ceil(person.born / 100);

      centuryFilter = selectedCenturies.includes(birthCentury.toString());
    }

    const queryFilter = !searchQuery
    || person.name.toLocaleLowerCase().includes(searchQuery);

    return sexFilter && centuryFilter && queryFilter;
  }) || [];

  return (
    <>
      {(!!people?.length && !error) && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
            <div className="column">
              <PeopleTable people={filteredPeople} />
            </div>
          </div>
        </div>
      )}
      {
        (people?.length === 0 && !error) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )
      }
      {(isLoading && <Loader />)}
      {
        error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )
      }
    </>
  );
};
