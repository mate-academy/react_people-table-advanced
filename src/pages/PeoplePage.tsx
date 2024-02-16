import {
  useContext, useEffect, useState,
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

  const loadAllPeople = async () => {
    try {
      setIsLoading(true);
      const allPeople = await getPeople();

      return allPeople;
    } catch {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }

    return undefined;
  };

  const updateAllPeople = async () => {
    const allPeople = await loadAllPeople();

    if (allPeople) {
      setPeople(allPeople);
    }
  };

  useEffect(() => {
    updateAllPeople();
  }, [people]);

  // let content;

  // if (isLoading) {
  //   content = <Loader />;
  // } else if (isError) {
  //   content = (
  //     <p data-cy="peopleLoadingError" className="has-text-danger">
  //       Something went wrong
  //     </p>
  //   );
  // } else if (!isLoading && people.length === 0) {
  //   content = (
  //     <p data-cy="noPeopleMessage">
  //       There are no people on the server
  //     </p>
  //   );
  // } else if (!isLoading && people.length !== 0) {
  //   content = <PeopleTable people={people} />;
  // }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">

              {/* <p>There are no people matching the current search criteria</p> */}
              {isLoading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && people.length !== 0 && (
                <PeopleTable people={people} />
              )}
              {/* {content} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
