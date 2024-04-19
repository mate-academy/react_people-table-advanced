import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { TableFilter } from '../enums/TableFilter';

export const PeoplePage: React.FC = () => {
  const [persons, setPersons] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('Something went wrong');
  const [searchParams] = useSearchParams();

  const sexFilter = searchParams.get('sex');
  const queryFilter = searchParams.get('query');
  const centuryFilter = searchParams.getAll('centuries').map(Number);

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        const preparedData = data.map(p => {
          const mother = data.find(d => d.name === p.motherName);
          const father = data.find(d => d.name === p.fatherName);

          return {
            ...p,
            mother: mother || undefined,
            father: father || undefined,
          };
        });

        setPersons(preparedData);
      })
      .catch(err => {
        setErrorMessage(err);
      })
      .finally(() => {
        setIsLoading(false);
        setErrorMessage('');
      });
  }, []);

  const tableSort = (arr: Person[]) => {
    const result = [...arr];

    switch (sort) {
      case TableFilter.Name:
      case TableFilter.Sex:
        result.sort((a, b) => a[sort].localeCompare(b[sort]));
        break;
      case TableFilter.Born:
      case TableFilter.Died:
        result.sort((a, b) => a[sort] - b[sort]);
        break;
      default:
        return result;
    }

    if (order === TableFilter.DescOrder) {
      result.reverse();
    }

    return result;
  };

  const filterPersons = () => {
    if (persons === null) {
      return [];
    }

    let filteredPersons = [...persons];

    if (sort) {
      filteredPersons = tableSort(filteredPersons);
    }

    if (sexFilter) {
      filteredPersons = filteredPersons.filter(
        person => person.sex === sexFilter,
      );
    }

    if (queryFilter) {
      filteredPersons = filteredPersons.filter(person =>
        person.name.toLowerCase().includes(queryFilter.toLowerCase()),
      );
    }

    if (!!centuryFilter.length) {
      filteredPersons = filteredPersons.filter(person => {
        return centuryFilter.includes(Math.ceil(person.born / 100));
      });
    }

    return filteredPersons;
  };

  const filteredPersons = filterPersons();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && (
                <>
                  {errorMessage && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {errorMessage}
                    </p>
                  )}

                  {persons?.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {filteredPersons?.length === 0 && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {!!filteredPersons.length && (
                    <PeopleTable persons={filteredPersons} />
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
