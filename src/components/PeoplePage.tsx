import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useLocation, useSearchParams } from 'react-router-dom';

const sortItensTable = (
  sort: string | null,
  order: string | null,
  people: Person[],
): Person[] => {
  if (!sort) {
    return people;
  }

  return [...people].sort((a: Person, b: Person) => {
    const aValue = String(a[sort as keyof Person] || '');
    const bValue = String(b[sort as keyof Person] || '');

    return order === 'desc'
      ? bValue.localeCompare(aValue)
      : aValue.localeCompare(bValue);
  });
};

export const PeoplePage = () => {
  const [isloading, setIsLoading] = useState(true);
  const location = useLocation();
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();

  const sortParams = {
    sort: searchParams.get('sort'),
    order: searchParams.get('order'),
    sex: searchParams.get('sex'),
    centuries: searchParams.getAll('centuries'),
    query: searchParams.get('query'),
    born: searchParams.get('born'),
    died: searchParams.get('died'),
  };

  // Extrai o slug da URL se existir
  const slug = location.pathname.split('/people/')[1];

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  }, []);

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
              {isloading ? (
                <Loader />
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable
                  isloading={isloading}
                  people={sortItensTable(
                    sortParams.sort,
                    sortParams.order,
                    people,
                  )}
                  selectedSlug={slug}
                  params={sortParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
