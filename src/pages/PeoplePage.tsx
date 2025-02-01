import { useEffect, useState } from 'react';
import { Person, OrderTypeEnum, SortFieldEnum } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') as SortFieldEnum | null;
  const currentOrder = searchParams.get('order') as OrderTypeEnum | null;

  const [peoples, setPeoples] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadPeoples = async () => {
    try {
      const peoplesResponse = await getPeople();

      setPeoples(peoplesResponse);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeoples();
  }, []);

  const filteredPeoples = peoples
    .filter(person => {
      const nameFilter = searchParams.get(SortFieldEnum.Name)?.toLowerCase();

      return nameFilter ? person.name.toLowerCase().includes(nameFilter) : true;
    })
    .sort((a, b) => {
      if (!currentSort) {
        return 0;
      }

      if (currentSort === SortFieldEnum.Name) {
        return currentOrder === OrderTypeEnum.Desc
          ? b.name.localeCompare(a.name, 'uk')
          : a.name.localeCompare(b.name, 'uk');
      }

      if (
        currentSort === SortFieldEnum.Born ||
        currentSort === SortFieldEnum.Died
      ) {
        return currentOrder === OrderTypeEnum.Desc
          ? b[currentSort] - a[currentSort]
          : a[currentSort] - b[currentSort];
      }

      if (currentSort === SortFieldEnum.Sex) {
        return currentOrder === OrderTypeEnum.Desc
          ? b.sex.localeCompare(a.sex, 'en')
          : a.sex.localeCompare(b.sex, 'en');
      }

      return 0;
    });

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
              {/*/!*<p>There are no people matching the current search criteria</p>*!/*/}

              {isLoading ? (
                <Loader />
              ) : error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              ) : peoples.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable peoples={filteredPeoples} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
