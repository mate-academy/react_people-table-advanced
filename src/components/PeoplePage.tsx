import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Search } from '../types/searchEnum';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedPeople = useMemo(() => {
    let preparedPeople = people;

    if (sort) {
      preparedPeople = preparedPeople.sort((pers1, pers2) => {
        switch (sort) {
          case Search.Name:
          case Search.Sex:
            return pers1[sort].localeCompare(pers2[sort]);
          case Search.Born:
          case Search.Died:
            return pers1[sort] - pers2[sort];
          default: return 0;
        }
      });
    }

    if (order) {
      preparedPeople.reverse();
    }

    if (sex) {
      preparedPeople = [...preparedPeople].filter(person => person.sex === sex);
    }

    if (query) {
      preparedPeople = [...preparedPeople].filter(
        person => person.name.toLowerCase().includes(query.toLowerCase().trim())
          || person.motherName?.toLowerCase().includes(
            query.toLowerCase().trim(),
          )
          || person.fatherName?.toLowerCase().includes(
            query.toLowerCase().trim(),
          ),
      );
    }

    if (centuries.length) {
      preparedPeople = [...preparedPeople].filter(person => (
        centuries.includes(Math.ceil(person.born / 100).toString())
      ));
    }

    return preparedPeople;
  }, [people, sort, order, sex, query, centuries]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {people.length === 0 && !isLoading && !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {sortedPeople.length === 0 && !isLoading ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
