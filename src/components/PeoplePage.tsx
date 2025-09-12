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
    const loadPeoples = async () => {
      try {
        setIsLoading(true);
        const peopleList = await getPeople();

        setPeoples(peopleList);
      } catch (e) {
        setError(true);
        setPeoples([]);
      } finally {
        setIsLoading(false);
        setFirstLoad(true);
      }
    };

    loadPeoples();
  }, []);

  const filteredPeoples = useMemo(() => {
    let result = [...peoples];

    const query = searchParams.get('query')?.toLocaleLowerCase();

    if (query) {
      result = result.filter(people =>
        [people.name, people.fatherName, people.motherName]
          .filter(Boolean)
          .some(name => name?.toLowerCase().includes(query)),
      );
    }

    const sex = searchParams.get('sex');

    if (sex) {
      result = result.filter(people => people.sex === sex);
    }

    const centuries = searchParams.getAll('centuries');

    if (centuries.length > 0) {
      result = result.filter(people => {
        const bornCentury = Math.floor(people.born / 100) + 1;

        return centuries.includes(String(bornCentury));
      });
    }

    const sortField = searchParams.get('sort') as keyof Person;
    const order = searchParams.get('order');

    if (sortField) {
      result.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (aVal == null || bVal == null) {
          return 0;
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return order === 'desc' ? bVal - aVal : aVal - bVal;
        }

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
            <PeopleFilters />
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
                peoples.length > 0 &&
                filteredPeoples.length === 0 && (
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
