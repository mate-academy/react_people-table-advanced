import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { GENDER_FEMALE, GENDER_MALE, SortCategories } from '../utils/vars';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((persons) => {
        const preparedPeople: Person[] = persons.map((person: Person) => ({
          ...person,
          mother: persons.find((mother) => mother.sex === GENDER_FEMALE
            && mother.name === person.motherName),
          father: persons.find((father) => father.sex === GENDER_MALE
            && father.name === person.fatherName),
        }));

        setPeople(preparedPeople);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    let visiblePeople = [...people];

    switch (sort) {
      case SortCategories.Name:
      case SortCategories.Sex:
        visiblePeople.sort((a, b) => a[sort].localeCompare(b[sort]));
        break;

      case SortCategories.Born:
      case SortCategories.Died:
        visiblePeople.sort((a, b) => a[sort] - b[sort]);
        break;

      default:
        break;
    }

    if (order) {
      visiblePeople.reverse();
    }

    if (sex) {
      visiblePeople = visiblePeople.filter(person => {
        return person.sex === sex;
      });
    }

    if (query) {
      visiblePeople = visiblePeople.filter(person => {
        const normalizedQuery = query.toLowerCase();

        return person.name.toLowerCase().includes(normalizedQuery)
          || person.fatherName?.toLowerCase().includes(normalizedQuery)
          || person.motherName?.toLowerCase().includes(normalizedQuery);
      });
    }

    if (centuries.length) {
      visiblePeople = visiblePeople.filter(person => {
        return centuries.some(century => +century === Math.floor(
          (person.born - 1) / 100,
        ) + 1);
      });
    }

    return visiblePeople;
  }, [sort, order, sex, query, centuries]);

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
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <PeopleTable people={filteredPeople} />
                  {isError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}
                  {!people.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {!filteredPeople.length && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
