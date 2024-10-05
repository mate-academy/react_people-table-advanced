import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ field: '', order: '' });

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries').map(Number) || '';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const handleQueryChange = (newQuery: string) => {
    if (newQuery) {
      searchParams.set('query', newQuery);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  const handleSexChange = (newSex: string) => {
    if (newSex) {
      searchParams.set('sex', newSex);
    } else {
      searchParams.delete('sex');
    }

    setSearchParams(searchParams);
  };

  const handleCenturyChange = (newCenturies: number[]) => {
    searchParams.delete('centuries');
    newCenturies.forEach(century =>
      searchParams.append('centuries', century.toString()),
    );
    setSearchParams(searchParams);
  };

  const handleSortChange = (field: string) => {
    setSortConfig(prev => {
      const isAscending = prev.field === field && prev.order !== 'desc';
      const newOrder = isAscending ? 'desc' : prev.field === field ? '' : 'asc';

      const newSearchParams = new URLSearchParams(searchParams);

      if (newOrder) {
        newSearchParams.set('sort', field);
        newSearchParams.set('order', newOrder);
      } else {
        newSearchParams.delete('sort');
        newSearchParams.delete('order');
      }

      setSearchParams(newSearchParams);

      return { field, order: newOrder };
    });
  };

  const filteredPeople = people
    .filter(person => {
      const matchesQuery =
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase());

      const matchesCentury =
        centuries.length === 0 ||
        centuries.includes(Math.floor(person.born / 100) + 1);
      const matchesGender = !sex || person.sex === sex;

      return matchesQuery && matchesCentury && matchesGender;
    })
    .sort((a, b) => {
      if (!sortConfig.field) {
        return 0;
      }

      const orderMultiplier = sortConfig.order === 'desc' ? -1 : 1;

      switch (sortConfig.field) {
        case 'name':
          return orderMultiplier * a.name.localeCompare(b.name);
        case 'sex':
          return orderMultiplier * a.sex.localeCompare(b.sex);
        case 'born':
          return orderMultiplier * (a.born - b.born);
        case 'died':
          return orderMultiplier * (a.died - b.died);
        case 'century':
          const centuryA = Math.floor(a.born / 100);
          const centuryB = Math.floor(b.born / 100);

          return orderMultiplier * (centuryA - centuryB);
        default:
          return 0;
      }
    });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters
                  query={query}
                  onQueryChange={handleQueryChange}
                  sex={sex}
                  onSexChange={handleSexChange}
                  centuries={centuries}
                  onCenturyChange={handleCenturyChange}
                />
              </div>
              <div className="column">
                <div className="box table-container">
                  {isError && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {filteredPeople.length > 0 ? (
                    <PeopleTable
                      people={filteredPeople}
                      onSortChange={handleSortChange}
                      sortConfig={sortConfig}
                    />
                  ) : (
                    !isLoading && (
                      <p data-cy="noPeopleMessage">
                        There are no people matching the current search criteria
                      </p>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
