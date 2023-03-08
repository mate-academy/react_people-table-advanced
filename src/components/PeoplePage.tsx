import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { getVisiblePeople } from '../utils/searchHelper';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const { slug = '' } = useParams();
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const [isError, setIsError] = useState(false);
  const centuries = searchParams.getAll('centuries');

  const getPeopleFromServer = async () => {
    setIsLoader(true);
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  useEffect(() => {
    getVisiblePeople(people, query, sex, centuries);
  }, [query, sex, centuries]);

  const filteredPeople = getVisiblePeople(people, query, sex, centuries);

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoader && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {isLoader
                ? (
                  <Loader />
                )
                : (
                  <PeopleTable slug={slug} people={filteredPeople} />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
