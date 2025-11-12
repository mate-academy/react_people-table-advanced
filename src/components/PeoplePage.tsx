import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
//import { useLocation, useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);

  const [searchParams] = useSearchParams();

  const activeCenturies = searchParams.getAll('centuries');
  const currQuery = searchParams.get('query') || '';
  const currSex = searchParams.get('sex');
  const sortCategory = searchParams.get('sort');
  // const sortOrder = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    setPeopleLoadingError(false);

    const loadPeople = async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (error) {
        setPeopleLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  // function toggleSortOrder(order: string) {
  //   if (order === '') {
  //     return 'asc';
  //   }

  //   if (order === 'asc') {
  //     return 'desc';
  //   }

  //   return '';
  // }

  // function handleSexChange() {}

  const getVisiblePeople = (
    peopleToShow: Person[],
    query: string,
    sex: string | null,
    orderToSort: string | null,
    centuries: string[],
  ) => {
    let prepearedPeople = [...peopleToShow];

    if (query) {
      prepearedPeople = prepearedPeople.filter(person =>
        person.name.includes(query),
      );
    }

    if (sex) {
      prepearedPeople = prepearedPeople.filter(person => person.sex === sex);
    }

    if (centuries && centuries.length > 0) {
      const centToNum = centuries.map(cent => +cent);

      prepearedPeople = prepearedPeople.filter(person => {
        const personCent = Math.ceil(person.born / 100);

        return centToNum.includes(personCent);
      });
    }

    if (sortCategory) {
      prepearedPeople = prepearedPeople.sort((person1, person2) => {
        switch (sortCategory) {
          case 'name':
            return orderToSort === 'desc'
              ? person2.name.localeCompare(person1.name)
              : person1.name.localeCompare(person2.name);

          case 'sex':
            return orderToSort === 'desc'
              ? person2.sex.localeCompare(person1.sex)
              : person1.sex.localeCompare(person2.sex);

          case 'born':
            return orderToSort === 'desc'
              ? person1.born - person2.born
              : person2.born - person1.born;

          case 'died':
            return orderToSort === 'desc'
              ? person1.died - person2.died
              : person2.died - person1.died;

          default:
            return 0;
        }
      });
    }

    return prepearedPeople;
  };

  const visiblePeople = getVisiblePeople(
    people || [],
    currQuery,
    currSex,
    sortCategory,
    activeCenturies,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading && people === null ? (
            <div className="column">
              <div className="box table-container">
                <Loader />
              </div>
            </div>
          ) : (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {peopleLoadingError ? (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  ) : (
                    <>
                      {/* <p data-cy="peopleLoadingError">Something went wrong</p> */}

                      {people?.length === 0 && (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      )}

                      {visiblePeople.length === 0 && (
                        <p>
                          There are no people matching the current search
                          criteria
                        </p>
                      )}

                      {visiblePeople.length !== 0 && people?.length !== 0 && (
                        <PeopleTable people={visiblePeople} />
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
          {/* <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              <Loader />

              <p data-cy="peopleLoadingError">Something went wrong</p>

              <p data-cy="noPeopleMessage">There are no people on the server</p>

              <p>There are no people matching the current search criteria</p>

              <PeopleTable />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
