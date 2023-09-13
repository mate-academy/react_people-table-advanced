import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { SortParams } from '../types/SortParams';
import { QueryParams } from '../types/QueryParams';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get(QueryParams.Query) || '';
  const sex = searchParams.get(QueryParams.Sex) || '';
  const centuries = searchParams.getAll(QueryParams.Centuries) || [];
  const sort = searchParams.get(QueryParams.Sort) || '';
  const order = searchParams.get(QueryParams.Order) || '';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    let preparedPeople = people.map(person => {
      const mother = people.find(mom => mom.name === person.motherName);
      const father = people.find(dad => dad.name === person.fatherName);

      return {
        ...person,
        mother,
        father,
      };
    });

    if (query) {
      preparedPeople = preparedPeople.filter(person => {
        return (
          person.name.toLowerCase().includes(query.toLowerCase().trim())
          || person.fatherName
            ?.toLowerCase()
            .includes(query.toLowerCase().trim())
          || person.motherName?.toLowerCase()
            .includes(query.toLowerCase().trim())
        );
      });
    }

    if (sex) {
      preparedPeople = preparedPeople.filter(person => {
        return person.sex === sex;
      });
    }

    if (centuries.length) {
      preparedPeople = preparedPeople.filter(person => {
        return centuries.find(century => {
          return Math.ceil(person.born / 100) === +century;
        });
      });
    }

    if (sort) {
      preparedPeople = [...preparedPeople].sort((person1, person2) => {
        switch (sort) {
          case SortParams.Name:
          case SortParams.Sex:
            return person1[sort].localeCompare(person2[sort]);
          case SortParams.Born:
          case SortParams.Died:
            return +person1[sort] - +person2[sort];

          default:
            throw new Error('Sorting went wrong...');
        }
      });
    }

    if (order) {
      preparedPeople = preparedPeople.reverse();
    }

    return preparedPeople;
  }, [people, query, sex, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {hasError ? (
                    <p
                      data-cy="peopleLoadingError"
                      className="has-text-danger"
                    >
                      Something went wrong
                    </p>
                  ) : (
                    <>
                      {people.length > 0 ? (
                        <PeopleTable people={filteredPeople} />
                      ) : (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      )}
                      {!filteredPeople.length && (
                        <p>
                          There are no people matching the current search
                          criteria
                        </p>
                      )}
                    </>
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
