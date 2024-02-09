import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [setIsLoading]);

  const preparedPeople = people.map(person => ({
    ...person,
    mother: people.find(mom => mom.name === person.motherName),
    father: people.find(dad => dad.name === person.fatherName),
  }));

  const filterPeople = () => {
    let filteredPeople = [...preparedPeople];

    if (query) {
      filteredPeople = filteredPeople.filter(person => {
        return person.name.toLowerCase().includes(query.toLowerCase())
          || person.fatherName?.toLowerCase().includes(query.toLowerCase())
          || person.motherName?.toLowerCase().includes(query.toLowerCase());
      });
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => {
        return person.sex === sex;
      });
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        return centuries.includes(Math.ceil(person.born / 100).toString());
      });
    }

    return filteredPeople;
  };

  const readyPeople = filterPeople();

  if (sortField) {
    readyPeople.sort((a, b) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return a[sortField].localeCompare(b[sortField]);

        case 'born':
        case 'died':
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });

    if (isReversed) {
      readyPeople.reverse();
    }
  }

  return (
    <div className="container">
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">

          {!isLoading && !errorMessage && people.length !== 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="box table-container">
            <h1 className="title">People Page</h1>

            {isLoading && (<Loader />)}

            {!isLoading && (<PeopleTable people={readyPeople} />)}
            {!isLoading && !!errorMessage && (
              <p
                data-cy="peopleLoadingError"
                className="has-text-danger"
              >
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
