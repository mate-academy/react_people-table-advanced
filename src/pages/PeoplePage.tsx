import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries').map(Number);
  const sex = searchParams.get('sex');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const peopleWithParents = people.map(person => {
    const mother = people.find(p => p.name === person.motherName);
    const father = people.find(p => p.name === person.fatherName);

    return {
      ...person,
      ...(mother && { mother }),
      ...(father && { father }),
    };
  });

  const filteredPeople = peopleWithParents.filter(person => {
    const matchesQuery =
      person.name.toLowerCase().includes(query) ||
      person.fatherName?.toLowerCase().includes(query) ||
      person.motherName?.toLowerCase().includes(query);

    const matchesSex = sex ? person.sex === sex : true;

    const bornCentury = Math.floor(person.born / 100) + 1;
    const diedCentury = Math.floor(person.died / 100) + 1;
    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(bornCentury) ||
      centuries.includes(diedCentury);

    return matchesQuery && matchesSex && matchesCentury;
  });

  const sortedPeople = (() => {
    if (!sort) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople].sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'sex':
          return a.sex.localeCompare(b.sex);
        case 'born':
          return a.born - b.born;
        case 'died':
          return a.died - b.died;
        default:
          return 0;
      }
    });

    return order === 'desc' ? sorted.reverse() : sorted;
  })();

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {!isLoading && <PeopleFilters />}
            </div>

            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!isLoading && !errorMessage && sortedPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the criteria
                </p>
              )}

              {!isLoading && !errorMessage && sortedPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
