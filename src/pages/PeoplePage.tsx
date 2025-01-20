import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
    const { slug } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [people, setPeople] = useState<Person[]>([]);
    const [query, setQuery] = useState('');
    const [genderFilter, setGenderFilter] = useState<'all' | 'm' | 'f'>('all');
    const [centuryFilter, setCenturyFilter] = useState<string[]>([]);
    const [sortField, setSortField] = useState<'name' | 'born' | 'died' | undefined>(undefined);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
      setIsLoading(true);

      getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
    }, []);

  const person = slug ? people.find(p => p.slug === slug) : null;

  const filteredPeople = useMemo(() => {
    const filtered = people.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.motherName?.toLowerCase() || '').includes(query.toLowerCase());

      const matchesGender = genderFilter === 'all' || p.sex.toLowerCase() === genderFilter;

      const matchesCentury =
        !centuryFilter.length || centuryFilter.some(century => p.born.toString().startsWith(century));

      return matchesQuery && matchesGender && matchesCentury;
    });

    // Сортування
    if (!sortField) {
      return filtered;
    }

    return [...filtered].sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortOrder === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      }

      if (typeof fieldA == 'number' && typeof fieldB === 'number') {
        return sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }

      return 0;
    });

  }, [query, genderFilter, centuryFilter, sortField, sortOrder, people]);
  return ( //
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters query={query} setQuery={setQuery} people={people} genderFilter={genderFilter} setGenderFilter={setGenderFilter} centuryFilter={centuryFilter} setCenturyFilter={setCenturyFilter}/>
          </div>

          <div className="column">
            <div className="box table-container">
            {isLoading ? (
              <Loader />
            ) : isError ? (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                ) : person ? (
                    <div>
                      <h2>{person.name}</h2>
                      <p>{person.sex}</p>
                      <p>{person.born}</p>
                      <p>{person.died}</p>
                      <p>{person.motherName || "-"}</p>
                      <p>{person.fatherName || "-"}</p>
                    </div>
                ) : people.length === 0 ? (
                      <p data-cy="noPeopleMessage">There are no people on the server</p>
                ) : (
                  <PeopleTable people={filteredPeople} slug={slug} setSortField={setSortField} setSortOrder={setSortOrder}/>
                  )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
