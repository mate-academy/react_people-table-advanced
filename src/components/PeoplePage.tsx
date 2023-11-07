import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

interface FilterParams {
  sex: string | null,
  centuries: string[] | null,
  query: string | null,
}

type Prepare = (
  people: Person[],
  filterParams: FilterParams,
) => Person[];

const preparePeople: Prepare = (people, { sex, centuries, query }) => {
  return people
    .map((person) => {
      return {
        ...person,
        motherName: person.motherName || '-',
        fatherName: person.fatherName || '-',
        mother: people.find(mother => mother.name === person.motherName),
        father: people.find(father => father.name === person.fatherName),
      };
    })
    .filter(person => {
      const isSexValid = sex === null
        ? true
        : person.sex === sex;
      const isCenturyValid = centuries === null || centuries?.length === 0
        ? true
        : centuries.includes(Math.ceil(person.born / 100).toString());
      const isNameValid = query === null
        ? true
        : person.name.toLowerCase().includes(query.toLowerCase());

      return isSexValid && isCenturyValid && isNameValid;
    });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const preparedPeople = useMemo(() => {
    const filterParams: FilterParams = {
      sex: searchParams.get('sex'),
      centuries: searchParams.getAll('centuries'),
      query: searchParams.get('query'),
    };

    return preparePeople(people, filterParams);
  }, [searchParams, people]);

  const isDataEmpty = useMemo(() => {
    return !isError && !isLoading && people.length === 0;
  }, [isLoading, isError, people]);

  const isDataPrepared = useMemo(() => {
    return !isError && !isLoading && people.length > 0;
  }, [isLoading, isError, people]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then((response) => {
        setPeople(preparePeople(
          response,
          { sex: null, centuries: null, query: null },
        ));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

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
              {isLoading && (<Loader />)}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isDataEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isDataPrepared && <PeopleTable people={preparedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
