import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types/Person';
import { getVisiblePeople } from '../../utils/filterFunction';

const preparePeople = (peopleFromServer: Person[]): Person[] => {
  return peopleFromServer.map((person) => ({
    ...person,
    mother: peopleFromServer.find(mother => mother.name === person.motherName),
    father: peopleFromServer.find(father => father.name === person.fatherName),
  }));
};

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);

      try {
        const peopleData = await getPeople();

        setPeople(preparePeople(peopleData));
      } catch {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const getBody = (
    loadingState: boolean,
    error: string,
    peopleArray: Person[],
  ) => {
    if (loadingState) {
      return <Loader />;
    }

    if (error && !loadingState) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      );
    }

    if (!peopleArray.length && !loadingState) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
    }

    return (
      <PeopleTable people={peopleArray} />
    );
  };

  const showFilters = (
    loadingState: boolean,
    error: string,
    peopleArray: Person[],
  ) => {
    if (!error.length && peopleArray.length && !loadingState) {
      return (
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters />
        </div>
      );
    }

    return false;
  };

  const visiblePeople = getVisiblePeople(people, searchParams);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {showFilters(isLoading, errorMessage, people)}

          <div className="column">
            <div className="box table-container">
              {getBody(isLoading, errorMessage, visiblePeople)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
