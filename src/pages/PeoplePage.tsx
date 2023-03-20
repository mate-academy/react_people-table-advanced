import { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { PeopleFilters } from '../components/PeopleFilters';
import { SortBy } from '../types/SortBy';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as SortBy | null;
  const order = searchParams.get('order');
  const location = useLocation();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries') || [];
  let visiblePeople: Person[] = [];

  const getParents = (loadedPeople: Person[], currentPerson: Person) => {
    const mother = loadedPeople.find(
      (person: Person) => currentPerson.motherName === person.name,
    );
    const father = loadedPeople.find(
      (person: Person) => currentPerson.fatherName === person.name,
    );

    return {
      ...currentPerson,
      mother,
      father,
    };
  };

  if (people) {
    visiblePeople = [...people];
    if (location.search) {
      if (sex) {
        visiblePeople = visiblePeople.filter(person => person.sex === sex);
      }

      if (query) {
        const querySmall = query.toLowerCase();

        visiblePeople = visiblePeople.filter(person => (
          person.name.toLowerCase().includes(querySmall)
           || person.motherName?.toLowerCase().includes(querySmall)
           || person.fatherName?.toLowerCase().includes(querySmall)
        ));
      }

      if (centuries.length) {
        visiblePeople = visiblePeople.filter(person => (
          centuries.includes(String(Math.ceil(person.born / 100)))
          || centuries.includes(String(Math.ceil(person.died / 100)))
        ));
      }

      if (sort && visiblePeople.length) {
        switch (sort) {
          case SortBy.Name:
          case SortBy.Sex:
            if (!order) {
              visiblePeople.sort((a, b) => a[sort].localeCompare(b[sort]));
            } else {
              visiblePeople.sort((a, b) => b[sort].localeCompare(a[sort]));
            }

            break;

          default:
            if (!order) {
              visiblePeople.sort((a, b) => a[sort] - b[sort]);
            } else {
              visiblePeople.sort((a, b) => b[sort] - a[sort]);
            }

            break;
        }
      }
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(loadedPeople => {
        const formatedPeople = loadedPeople
          .map(currentPerson => getParents(loadedPeople, currentPerson));

        setPeople(formatedPeople);
      })
      .catch(() => setIsErrorLoading(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people
                  && !!people.length
                  && <PeopleFilters />}

          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isErrorLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              { people && !people.length && !isLoading && !isErrorLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people
                  && !!people.length
                  && !visiblePeople.length
                  && !isLoading
                  && !isErrorLoading
                  && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

              {people
                && !!people.length
                && visiblePeople.length > 0
                && <PeopleTable people={visiblePeople} slug={slug} />}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
