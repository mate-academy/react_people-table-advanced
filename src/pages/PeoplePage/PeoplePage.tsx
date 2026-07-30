import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { PersonTable } from '../../components/PersonTable/PersonTable';
import { Errors, Person } from '../../types';
import { sortPeople } from '../../utils/sortHelper';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.noError);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadPeopleData = async (): Promise<boolean> => {
      setIsLoading(true);
      setErrorMessage(Errors.noError);

      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);

        return true;
      } catch (error: unknown) {
        setErrorMessage(Errors.PeopleLoadingError);

        return false;
      } finally {
        setIsLoading(false);
      }
    };

    loadPeopleData();
  }, []);

  const visiblePeople = useMemo(() => {
    let result = [...people];
    const query = searchParams.get('query')?.toLowerCase();
    const centuries = searchParams.getAll('centuries');
    const sortBy = searchParams.get('sort') as keyof Person | null;
    const order = searchParams.get('order');

    if (query) {
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.motherName?.toLowerCase().includes(query) ||
          p.fatherName?.toLowerCase().includes(query),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(p =>
        centuries.includes(String(Math.ceil(p.born / 100))),
      );
    }

    if (sortBy) {
      result = sortPeople(result, sortBy, order);
    }

    return result;
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="columns is-desktop is-flex-direction-row-reverse">
        {people.length !== 0 && !isLoading && !errorMessage && (
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
        )}
        <div className="column">
          <div className="box table-container">
            {isLoading && <Loader />}
            {errorMessage !== Errors.noError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errorMessage}
              </p>
            )}
            {people.length === 0 && !isLoading && !errorMessage && (
              <p data-cy="noPeopleMessage">{Errors.NoPeopleError}</p>
            )}
            {visiblePeople.length > 0 && (
              <PersonTable persons={visiblePeople} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
