import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { ColumnsNames } from '../types/ColumnsNames';
import { SearchParams } from '../types/SearchParams';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const arePeopleShown = !isLoading && !hasLoadingError;

  const { slug } = useParams();

  const [searchParams] = useSearchParams();

  const sex = searchParams.get(SearchParams.Sex);
  const query = searchParams.get(SearchParams.Query) || '';
  const centuries = searchParams.getAll(SearchParams.Centuries);
  const sort = searchParams.get(SearchParams.Sort);
  const order = searchParams.get(SearchParams.Sort);

  const preparedPeople = (() => {
    let newPeople = [...people];

    if (sex || query || centuries.length > 0) {
      newPeople = people.filter(person => {
        return person.name.toLowerCase().includes(query.toLowerCase())
          && (sex ? person.sex === sex : true)
          && (centuries.length > 0
            ? centuries.includes(String(Math.floor(person.born / 100)))
            : true);
      });
    }

    if (sort) {
      newPeople.sort((a, b) => {
        switch (sort) {
          case ColumnsNames.Name:
            return a.name.localeCompare(b.name);

          case ColumnsNames.Sex:
            return a.sex.localeCompare(b.sex);

          case ColumnsNames.Born:
            return a.born - b.born;

          case ColumnsNames.Died:
            return a.died - b.died;

          default:
            return 0;
        }
      });
    }

    if (order) {
      newPeople.reverse();
    }

    return newPeople;
  })();

  useEffect(() => {
    getPeople()
      .then(receivedPeople => {
        setHasLoadingError(false);
        setPeople(receivedPeople.map(person => {
          const mother = receivedPeople
            .find(item => item.name === person.motherName);

          const father = receivedPeople
            .find(item => item.name === person.fatherName);

          return { ...person, mother, father };
        }));
      })
      .catch(() => setHasLoadingError(true))
      .finally(() => setIsLoading(false));
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
              {isLoading && <Loader />}

              {!isLoading && hasLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {arePeopleShown && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {arePeopleShown && people.length !== 0 && (
                preparedPeople.length > 0 ? (
                  <PeopleTable people={preparedPeople} slug={slug} />
                ) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
