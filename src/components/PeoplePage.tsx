import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNoPeople, setIsNoPeople] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setIsNoPeople(false);

    getPeople()
      .then(res => {
        if (!res.length) {
          setIsNoPeople(true);
        }

        setPeopleFromServer(res);
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const filteringByQuery = (people: Person[], queryValue: string) => {
    if (!queryValue || !queryValue.trim().length) {
      return people;
    }

    return people.filter((person) => {
      return person.name.toLowerCase().includes(queryValue.toLowerCase())
        || person.fatherName?.toLowerCase().includes(queryValue.toLowerCase())
        || person.motherName?.toLowerCase().includes(queryValue.toLowerCase());
    });
  };

  const filteringBySex = (people: Person[], sexValue: string | null) => {
    if (!sexValue) {
      return people;
    }

    return people.filter(person => person.sex === sexValue);
  };

  const filteringByCenturies = (people: Person[],
    centuriesValues: string[]) => {
    if (!centuriesValues.length) {
      return people;
    }

    return people.filter(person => {
      const bornCentury = (Math.floor(person.born * 0.01) + 1).toString();

      return centuriesValues.includes(bornCentury);
    });
  };

  const peopleFilteredByQuery = useMemo(() => {
    return filteringByQuery(peopleFromServer, query);
  }, [query, peopleFromServer]);

  const peopleFilteredBySex = useMemo(() => {
    return filteringBySex(peopleFilteredByQuery, sex);
  }, [sex, peopleFilteredByQuery]);

  const peopleFilteredByCentury = useMemo(() => {
    return filteringByCenturies(peopleFilteredBySex, centuries);
  }, [centuries, peopleFilteredBySex]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        {isLoading ? <Loader />
          : (
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
              <div className="column">
                <div className="box table-container">
                  {isError && (
                    <p data-cy="peopleLoadingError">
                      Something went wrong
                    </p>
                  )}
                  {isNoPeople && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {peopleFilteredByCentury.length
                    ? <PeopleTable people={peopleFilteredByCentury} />
                    : (
                      <p>
                        There are no people matching the current search
                        criteria
                      </p>
                    )}
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
};
