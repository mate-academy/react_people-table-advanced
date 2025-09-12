/* eslint-disable @typescript-eslint/indent */
import { useEffect, useMemo, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);

  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let ignore = false;

    const loadPeoples = async () => {
      try {
        setIsLoading(true);
        const peopleList = await getPeople();
        if (!ignore) setPeoples(peopleList);
      } catch {
        if (!ignore) setError(true);
      } finally {
        if (!ignore) {
          setIsLoading(false);
          setFirstLoad(true);
        }
      }
    };

    loadPeoples();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredPeoples = useMemo(() => {
    let result = [...peoples];
    const query = searchParams.get('query')?.toLowerCase();
    if (query) {
      result = result.filter(people =>
        [people.name, people.fatherName, people.motherName]
          .filter(Boolean)
          .some(name => name!.toLowerCase().includes(query)),
      );
    }

    const sex = searchParams.get('sex');
    if (sex) result = result.filter(people => people.sex === sex);

    const centuries = searchParams.getAll('centuries');
    if (centuries.length > 0) {
      result = result.filter(people => {
        if (!people.born || isNaN(people.born)) return false;
        const bornCentury = Math.floor(people.born / 100) + 1;
        return centuries.includes(String(bornCentury));
      });
    }

    const sortField = searchParams.get('sort') as keyof Person;
    const order = searchParams.get('order');

    if (sortField) {
      result.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];

        if (typeof aVal === 'number' || typeof bVal === 'number') {
          aVal = typeof aVal === 'number' ? aVal : Infinity;
          bVal = typeof bVal === 'number' ? bVal : Infinity;
          return order === 'desc' ? bVal - aVal : aVal - bVal;
        }

        aVal = aVal ?? '';
        bVal = bVal ?? '';
        return order === 'desc'
          ? String(bVal).localeCompare(String(aVal))
          : String(aVal).localeCompare(String(bVal));
      });
    }

    return result;
  }, [peoples, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {firstLoad && !isLoading && !error && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !error && firstLoad && peoples.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !error &&
                filteredPeoples.length === 0 &&
                peoples.length > 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people matching the current search criteria
                  </p>
                )}

              {!isLoading && !error && filteredPeoples.length > 0 && (
                <PeopleTable peoples={filteredPeoples} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
