import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilters';

const SEARCH_OPTIONS = {
  sort: 'sort',
  order: 'order',
  sex: 'sex',
  query: 'query',
  centuries: 'centuries',
};

export const PeoplePage = () => {
  const [
    peopleFromServer,
    setPeopleFromServer,
  ] = useState<Person[] | null>(null);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();

  const isDataSuccessfulyFetched = !isLoading
    && !errorMessage && peopleFromServer;

  const applyFiltering = () => {
    let people = peopleFromServer || [];
    const params = Object.fromEntries(searchParams.entries());

    Object.keys(params)
      .forEach(key => {
        switch (key) {
          case SEARCH_OPTIONS.sort: {
            const sortBy = searchParams.get('sort');

            if (sortBy) {
              if (sortBy === 'born' || sortBy === 'died') {
                people = [...people].sort((a, b) => {
                  return a[sortBy] - b[sortBy];
                });
              }

              if (sortBy === 'name' || sortBy === 'sex') {
                people = [...people].sort((a, b) => {
                  return a[sortBy].localeCompare(b[sortBy]);
                });
              }
            }

            break;
          }

          case SEARCH_OPTIONS.order:
            people = [...people].reverse();
            break;
          case SEARCH_OPTIONS.sex:
            people = people.filter(({ sex }) => sex === params[key]);
            break;
          case SEARCH_OPTIONS.query:
            people = people.filter(({ name, fatherName, motherName }) => {
              const namesWhereSearch = name
                + (fatherName || '') + (motherName || '');

              return namesWhereSearch.toLowerCase()
                .includes(params[key].toLowerCase());
            });
            break;
          case SEARCH_OPTIONS.centuries: {
            const filteringCenturies = searchParams.getAll(key);

            people = people.filter(({ born }) => {
              const peopleCentury = Math.ceil(born / 100).toString();

              return filteringCenturies.includes(peopleCentury);
            });
            break;
          }

          default:
            break;
        }
      });

    setFilteredPeople(people);
  };

  const preparePeopleData = (people: Person[]) => {
    const preparedPeople = people.map(person => {
      let mother;
      let father;

      if (person.motherName) {
        mother = people.find(({ name }) => person.motherName === name);
      }

      if (person.fatherName) {
        father = people.find(({ name }) => person.fatherName === name);
      }

      return { ...person, mother, father };
    });

    setPeopleFromServer(preparedPeople);
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(preparePeopleData)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    applyFiltering();
  }, [searchParams, peopleFromServer]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isDataSuccessfulyFetched && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {
                errorMessage && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {errorMessage}
                  </p>
                )
              }

              {
                isDataSuccessfulyFetched && (
                  <>
                    {!peopleFromServer.length && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    {peopleFromServer.length > 0
                      && filteredPeople.length === 0 && (
                      <p>
                        There are no people matching the current search criteria
                      </p>
                    )}

                    {peopleFromServer.length > 0
                      && filteredPeople.length > 0 && (
                      <PeopleTable people={filteredPeople} />
                    )}
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
