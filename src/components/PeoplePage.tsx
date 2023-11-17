import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [getpeople, setGetPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const [preparedPeople, setPreparedPeople] = useState([...getpeople]);
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    const filteredPeople = [...getpeople];
    let finishPeople = [...filteredPeople];

    if (centuries.length > 0) {
      finishPeople = finishPeople.filter(person => {
        return centuries.includes(Math.ceil(person.born / 100).toString());
      });
    }

    if (sex) {
      finishPeople = finishPeople.filter(person => person.sex.includes(sex));
    }

    if (query) {
      finishPeople = finishPeople.filter(person => {
        return (
          person.fatherName?.toLowerCase().includes(query)
          || person.motherName?.toLowerCase().includes(query)
          || person.name.toLowerCase().includes(query)
        );
      });
    }

    if (finishPeople.length <= 0) {
      setError('There are no people matching the current search criteria');
    }

    setPreparedPeople(finishPeople);
  }, [getpeople, searchParams]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(people => {
        if (!people.length) {
          setError('There are no people on the server');
        }

        setGetPeople(people);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Something went wrong');
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              query={query}
              sex={sex}
              centuries={centuries}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}
              {!!error && preparedPeople.length === 0 && !isLoading && (
                <>
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {error}
                  </p>
                  {getpeople.length <= 0 && (
                    <p data-cy="noPeopleMessage">
                      {error}
                    </p>
                  )}
                </>
              )}

              {preparedPeople.length > 0 && !isLoading && (
                <PeopleTable
                  getpeople={getpeople}
                  preparedPeople={preparedPeople}
                  sort={sort}
                  order={order}
                  centuries={centuries}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
