import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useSearchParamsContext } from '../SearchParamsContext';

export const PeoplePage = () => {
  const { searchParams } = useSearchParamsContext();
  const navigate = useNavigate();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const filteredPeople = people.filter(person => {
    if (query) {
      return person.name.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase());
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

  const handleSort = (field: string) => {
    let newOrder = 'asc';
    const currentField = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentField === field) {
      if (currentOrder === 'asc') {
        newOrder = 'desc';
      } else if (currentOrder === 'desc') {
        searchParams.delete('sort');
        searchParams.delete('order');
        navigate(`/people?${searchParams.toString()}`);

        return;
      }
    }

    searchParams.set('sort', field);
    searchParams.set('order', newOrder);
    navigate(`/people?${searchParams.toString()}`);
  };

  useEffect(() => {
    const newPeople = [...filteredByCentury];
    const sortField = searchParams.get('sort');
    const sortOrder = searchParams.get('order');

    if (sortField && sortOrder) {
      newPeople.sort((a, b) => {
        if (typeof a[sortField as keyof Person] === 'string'
        && typeof b[sortField as keyof Person] === 'string') {
          return (a[sortField as keyof Person] as string)
            .localeCompare(b[sortField as keyof Person] as string);
        }

        if (typeof a[sortField as keyof Person] === 'number'
        && typeof b[sortField as keyof Person] === 'number') {
          return (a[sortField as keyof Person] as number)
          - (b[sortField as keyof Person] as number);
        }

        return 0;
      });

      if (sortOrder === 'desc') {
        newPeople.reverse();
      }
    }

    setSortedPeople(newPeople);
  }, [filteredByCentury, searchParams]);

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
        return (
          <PeopleTable
            people={sortedPeople}
            handleSort={handleSort}
            sortState={{
              sortField: searchParams.get('sort'),
              sortOrder: searchParams.get('order'),
            }}
          />
        );
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
