import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const sex = searchParams.get('sex') ?? '';
  const sort = searchParams.get('sort') ?? '';
  const order = searchParams.get('order') ?? '';
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    getPeople()
      .then(data => {
        if (data.length > 0) {
          setPeople(data);
        } else {
          setEmptyError(true);
        }
      })
      .catch(error => {
        setIsError(true);
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = people?.filter((person: Person) => {
    const isSexMatching = !sex || sex === person.sex;
    const isQueryMatching =
      query.length === 0 ||
      !query ||
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(query.toLowerCase());
    const lifeTimeCentury = Math.ceil(person.born / 100);
    const isCenturyMatching =
      centuries.length === 0 || centuries.includes(lifeTimeCentury.toString());

    return isSexMatching && isQueryMatching && isCenturyMatching;
  });

  const sortedPeople = [...filteredPeople].sort((a: Person, b: Person) => {
    let result = 0;

    switch (sort) {
      case 'name':
      case 'sex':
        result = a[sort].localeCompare(b[sort]);
        break;
      case 'born':
      case 'died':
        result = Number(a[sort]) - Number(b[sort]);
        break;
    }

    if (order === 'desc') {
      result *= -1;
    }

    return result;
  });

  const isLoaded = !isLoading && !isError && !emptyError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {emptyError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople?.length === 0 && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoaded && <PeopleTable people={sortedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
