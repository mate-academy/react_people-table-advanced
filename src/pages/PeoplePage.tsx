import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);

  const [isError, setIsError] = useState(false);
  const { selectedSlug } = useParams();

  const [searchParams] = useSearchParams();

  const filteredPeople = useMemo(() => {
    if (!people) {
      return [];
    }

    let result = [...people];

    const sex = searchParams.get('sex');

    if (sex && sex !== 'all') {
      result = result.filter(p => p.sex === sex.slice(0, 1));
    }

    const query = searchParams.get('query')?.toLowerCase() || '';

    if (query) {
      result = result.filter(p => p.name.toLowerCase().includes(query));
    }

    const centuries = searchParams.getAll('centuries');

    if (centuries.length > 0) {
      result = result.filter(p => {
        const birthCentury = Math.ceil(p.born / 100).toString();

        return centuries.includes(birthCentury);
      });
    }

    const allowedSortFields = ['name', 'sex', 'born', 'died'] as const;

    type SortField = (typeof allowedSortFields)[number];

    const sortBy = searchParams.get('sort') as SortField | null;
    const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

    if (sortBy && allowedSortFields.includes(sortBy)) {
      result.sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];

        if (typeof valA === 'number' && typeof valB === 'number') {
          return order === 'desc' ? valB - valA : valA - valB;
        }

        return order === 'desc'
          ? String(valB).localeCompare(String(valA))
          : String(valA).localeCompare(String(valB));
      });
    }

    return result;
  }, [people, searchParams]);

  const fetchPeople = async () => {
    try {
      const peopleData = await getPeople();

      setPeople(peopleData);
    } catch (e) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const nameToSlugMap = useMemo(() => {
    if (!people) {
      return new Map();
    }

    return new Map(people.map(p => [p.name, p.slug]));
  }, [people]);

  if (isError) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          </div>
        </div>
      </>
    );
  }

  if (people?.length === 0) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people ? (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {filteredPeople.length !== 0 ? (
                    <PeopleTable
                      people={filteredPeople}
                      selectedSlug={selectedSlug || ''}
                      nameToSlugMap={nameToSlugMap}
                    />
                  ) : (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="column">
              <div className="box table-container">
                <Loader />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
