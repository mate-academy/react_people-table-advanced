import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleList/PeopleList';
import { Person, PersonWithCentury } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[] | PersonWithCentury[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  const addCenturyToPeople = (people: Person[]): PersonWithCentury[] => {
    return people.map(person => ({
      ...person,
      century: Math.ceil(person.born / 100),
    }));
  };

  const displayedPeople = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const receivingData: Person[] = await getPeople();

      const transformedData: PersonWithCentury[] =
        addCenturyToPeople(receivingData);

      setPeopleList(transformedData);
    } catch (error) {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filteredPeople = useMemo(() => {
    let result = [...peopleList];

    const sex = searchParams.get('sex');
    const name = searchParams.get('name') || '';
    const centuries = searchParams.getAll('centuries');

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (name) {
      result = result.filter(person =>
        person.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(person =>
        centuries.includes(String(person.century)),
      );
    }

    return result;
  }, [peopleList, searchParams]);

  useEffect(() => {
    displayedPeople();
  }, [displayedPeople]);

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
              {isLoading && <Loader />}
              {!!errorMessage && <ErrorMessage errorMessage={errorMessage} />}
              {!isLoading && !errorMessage && filteredPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people with these filters
                </p>
              )}
              {filteredPeople.length > 0 && (
                <PeopleTable peopleList={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
