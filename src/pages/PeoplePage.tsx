import { useSearchParams } from 'react-router-dom';
import {
  useContext, useLayoutEffect, useMemo, useState,
} from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleContext } from '../context/PeopleContext';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const isBornInCenturies = (birthYear: number, centuriess: string[]) => {
    for (let i = 0; i < centuriess.length; i += 1) {
      const startYear = (+centuriess[i] - 1) * 100 + 1;
      const endYear = +centuriess[i] * 100;

      if (birthYear >= startYear && birthYear <= endYear) {
        return true;
      }
    }

    return false;
  };

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      return (person.name.includes(query)
      || (person.motherName && person.motherName.includes(query))
      || (person.fatherName && person.fatherName.includes(query)))
      && (sex ? person.sex === sex : true)
      && (centuries.length > 0
        ? isBornInCenturies(person.born, centuries) : true);
    });
  }, [people, query, sex, centuries]);

  useLayoutEffect(() => {
    (() => {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const allPeople = await getPeople();

          setPeople(allPeople);
        } catch {
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    })();
  }, [setPeople]);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  } else if (!isLoading && !people.length) {
    content = (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  } else if (filteredPeople.length === 0) {
    content = (
      <p>There are no people matching the current search criteria</p>
    );
  } else if (!isLoading && !!people.length) {
    content = <PeopleTable people={filteredPeople} />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
