import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const getPeopleFromServer = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // const removeAllParams = () => {
  //   Object.entries(searchParams).forEach(([key]) => {
  //     searchParams.delete(key);
  //   });
  // };

  useEffect(() => {
    getPeopleFromServer();
  }, [people]);

  const filterPeople = (initialPeople: Person[]) => {
    let listOfPeople = [...initialPeople];

    if (sex) {
      listOfPeople = listOfPeople.filter((person) => person.sex === sex);
    }

    if (query) {
      const isInTheList = (person: string | null) => {
        return person
          ? person.toLowerCase().includes(query.toLowerCase())
          : null;
      };

      listOfPeople = listOfPeople.filter((person) => {
        return (
          isInTheList(person.name)
          || isInTheList(person.motherName)
          || isInTheList(person.fatherName)
        );
      });
    }

    if (centuries.length) {
      listOfPeople = listOfPeople.filter((person) => {
        const personCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(personCentury);
      });
    }

    return listOfPeople;
  };

  const filteredPeople = filterPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isError && !isLoading && !filteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isError && !isLoading && filteredPeople.length && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
