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
  const selectedSex = searchParams.get('sex');

  const filteredByQuery = people.filter(person => {
    if (query) {
      return person.name.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase());
    }

    return true;
  });

  const filteredByCentury = filteredByQuery.filter(person => {
    if (selectedCenturies.length > 0) {
      const century = Math.ceil(person.died / 100);

      return selectedCenturies.includes(century.toString());
    }

    return true;
  });

  const filteredPeople = filteredByCentury.filter(person => {
    if (selectedSex) {
      return person.sex === selectedSex;
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
    const newPeople = [...filteredPeople];
    const sortField = searchParams.get('sort');
    const sortOrder = searchParams.get('order');

    if (sortField && sortOrder) {
      const firstPerson = newPeople[0];
      const sortFieldType = typeof firstPerson?.[sortField as keyof Person];

      newPeople.sort((a, b) => {
        const aValue = a[sortField as keyof Person];
        const bValue = b[sortField as keyof Person];

        if (sortFieldType === 'string') {
          return (aValue as string).localeCompare(bValue as string);
        }

        if (sortFieldType === 'number') {
          return (aValue as number) - (bValue as number);
        }

        return 0;
      });

      if (sortOrder === 'desc') {
        newPeople.reverse();
      }
    }

    setSortedPeople(newPeople);
  }, [filteredPeople, searchParams]);

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

      case filteredPeople.length === 0:
        return (
          <p data-cy="noPeopleMessage">
            There are no people matching the current search criteria
          </p>
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
