import React, { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuery, setQuery] = useState('');
  const [currentSex, setSex] = useState('');
  const [error, setError] = useState(false);
  const [selectedCenturies, setSelectedCenturies] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      getPeople()
        .then(peopleFromServer => {
          setPeople(peopleFromServer);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 2000);
  }, []);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleSexChange = (newSex: string) => {
    setSex(newSex);
  };

  const handleCenturyChange = (century: string) => {
    setSelectedCenturies((prevCenturies) => {
      if (prevCenturies.includes(century)) {
        return prevCenturies.filter((cent) => cent !== century);
      }

      return [...prevCenturies, century];
    });
  };

  const handleDelete = () => {
    setSelectedCenturies([]);
  };

  const handleReset = () => {
    setSelectedCenturies([]);
    setQuery('');
    setSex('all');
  };

  const visiblePeople = (peopleArray: Person[], query: string,
    sex: string, centuries: string[]) => {
    let filteredPeople = [...peopleArray];
    const filteredBySex = () => {
      if (sex !== 'all') {
        filteredPeople = peopleArray.filter(person => person.sex === sex);
      }

      return filteredPeople;
    };

    const matchesQuery = () => {
      filteredPeople = peopleArray
        .filter(person => person.name
          .toLowerCase().includes(query.toLowerCase())
          || person.motherName?.toLowerCase().includes(query.toLowerCase())
          || person.fatherName?.toLowerCase().includes(query.toLowerCase()));
    };

    const filteredByCentury = () => {
      filteredPeople = filteredPeople.filter(person => {
        const personCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(personCentury);
      });
    };

    if (query) {
      matchesQuery();
    }

    if (sex) {
      filteredBySex();
    }

    if (sex && query) {
      filteredBySex();
      matchesQuery();
    }

    if (centuries.length > 0) {
      filteredByCentury();
    }

    return filteredPeople;
  };

  return (

    <div className="section">
      <div className="container">

        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                onQueryChange={handleQueryChange}
                onSexChange={handleSexChange}
                onCenturiesChange={handleCenturyChange}
                deleteCenturies={handleDelete}
                onReset={handleReset}
              />
            </div>

            <div className="column">
              <div className="box table-container">
                {error
                  && <p data-cy="peopleLoadingError">Something went wrong</p>}

                {isLoading
                  ? <Loader />
                  : (
                    <PeopleTable
                      people={visiblePeople(people, currentQuery,
                        currentSex, selectedCenturies)}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
