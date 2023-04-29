/* eslint-disable no-console */
/* eslint-disable max-len */
import axios from 'axios';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { filterPeople } from '../utils/filterPeople';

const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const isMounted = useRef(false);

  const [serachParams, setSearchParams] = useSearchParams();
  const query = serachParams.get('query') || '';
  const sex = serachParams.get('sex') || '';
  const centuries = serachParams.getAll('centuries') || [];

  const { slug = '' } = useParams();

  const getPeopleFromServer = async () => {
    const controller = new AbortController();

    try {
      setIsLoading(true);
      setIsError(false);
      const { data } = await axios.get<Person[]>('https://mate-academy.github.io/react_people-table/api/people.json', {
        signal: controller.signal,
      });

      console.log(isMounted, data);
      if (isMounted) {
        if (data.length) {
          setPeopleData(data);
        }
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    setTimeout(getPeopleFromServer, 500);

    return () => {
      setPeopleData([]);
      isMounted.current = false;
    };
  }, []);

  const visiblePersons = useMemo(() => {
    return filterPeople(query, sex, centuries, peopleData);
  }, [query, sex, centuries]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {peopleData.length > 0 && (
              <PeopleFilters
                searchParams={serachParams}
                setSearchParams={setSearchParams}
                query={query}
                sex={sex}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!peopleData.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !visiblePersons.length && (
                <p>There are no people matching the current search criteria</p>)}

              {peopleData.length > 0 && <PeopleTable people={visiblePersons} slug={slug} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
