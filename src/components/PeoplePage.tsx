import { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useSearchParamsContext } from '../SearchParamsContext';

export const PeoplePage = () => {
  const { searchParams } = useSearchParamsContext();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const filteredPeople = people.filter(person => {
    if (query) {
      return person.name.toLowerCase().includes(query.toLowerCase()) ||
             person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
             person.fatherName?.toLowerCase().includes(query.toLowerCase());
    }
    return true;
  });

  const filteredByCentury = filteredPeople.filter(person => {
    if (selectedCenturies.length > 0) {
      const century = Math.ceil(person.died / 100);
      return selectedCenturies.includes(century.toString());
    }
    return true;
  });

  useEffect(() => {
    getPeople()
      .then((data) => {
        setPeople(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setHasError(true);
      });
  }, []);

  const renderContent = () => {
    switch (true) {
      case hasError:
        return <p data-cy="peopleLoadingError">Something went wrong</p>;

      case isLoading:
        return <Loader />;

      case people.length === 0:
        return (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        );

      default:
        return <PeopleTable people={filteredByCentury} />;
    }
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
