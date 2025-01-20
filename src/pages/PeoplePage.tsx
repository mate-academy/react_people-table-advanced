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
    const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
    const [centuryFilter, setCenturyFilter] = useState<'16' | '17' | '18' | '19' | '20' | undefined>(undefined);

    useEffect(() => {
      setIsLoading(true);

      getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
    }, []);

  const person = slug ? people.find(p => p.slug === slug) : null;

  const filteredPeople = useMemo(() => {
    return people.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.motherName?.toLowerCase() || '').includes(query.toLowerCase());

      const matchesGender = genderFilter === 'all' || p.sex.toLowerCase() === genderFilter;

      const matchesCentury = !centuryFilter || p.born.toString().startsWith(centuryFilter);

      return matchesQuery && matchesGender && matchesCentury;
    });
  }, [query, genderFilter, centuryFilter, people]);

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
                  <PeopleTable people={filteredPeople} slug={slug}/>
                  )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
