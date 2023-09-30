import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import {
  getFatherPerson,
  getMotherPerson,
  hasIncludeQuery,
} from '../utils/utils';
import { PeopleFilters } from '../components/PeopleFilters';
import { yearsPerCentury } from '../utils/constants';
import { SortOptions } from '../types/SortOptions';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorHappened, setIsErrorHappened] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const { search } = useLocation();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        setPeople(
          peopleFromServer.map((personData) => {
            const mother = getMotherPerson(
              peopleFromServer, personData,
            );
            const father = getFatherPerson(
              peopleFromServer, personData,
            );

            return {
              ...personData,
              mother,
              father,
            };
          }),
        );
      })
      .catch(() => setIsErrorHappened(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getFilteredPeople = () => {
    const params = new URLSearchParams(search);

    const sex = params.get('sex') || '';
    const centuries = params.getAll('centuries') || [];
    const query = params.get('query') || '';
    const sort = params.get('sort') || '';
    const order = params.get('order') || '';

    let preparedPeople = [...people];

    if (sex.length > 0) {
      preparedPeople = preparedPeople.filter((person) => {
        return person.sex === sex;
      });
    }

    if (centuries.length > 0) {
      preparedPeople = preparedPeople.filter(person => {
        const numberOfCentury = Math.ceil(person.born / yearsPerCentury);

        return centuries.includes(numberOfCentury.toString());
      });
    }

    if (query) {
      preparedPeople = preparedPeople.filter(person => {
        return hasIncludeQuery(person.name, query)
          || hasIncludeQuery((person.motherName || ''), query)
          || hasIncludeQuery((person.fatherName || ''), query);
      });
    }

    if (sort) {
      preparedPeople.sort((a, b) => {
        switch (sort) {
          case SortOptions.Name:
            return a.name.localeCompare(b.name);
          case SortOptions.Sex:
            return a.sex.localeCompare(b.sex);
          case SortOptions.Born:
            return a.born - b.born;
          case SortOptions.Died:
            return a.died - b.died;
          default:
            return 0;
        }
      });
    }

    if (order) {
      preparedPeople.reverse();
    }

    return preparedPeople;
  };

  const isPeopleNotExist = !isLoading && !isErrorHappened && !people.length;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isErrorHappened && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isPeopleNotExist && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && (
                <PeopleTable
                  people={getFilteredPeople()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
