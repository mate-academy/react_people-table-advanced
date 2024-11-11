import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useLocation } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getPeople()
      .then(setPeople)
      .catch(loadingError => {
        setErrorMessage('Something went wrong');

        throw loadingError;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visiblePeopleList = () => {
    let filteredPeople = people.map(person => {
      return {
        ...person,
        motherSlug:
          people.find(child => child.name === person.motherName)?.slug || '',
        fatherSlug:
          people.find(child => child.name === person.fatherName)?.slug || '',
      };
    });

    const searchParams = new URLSearchParams(search);

    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');
    const query = searchParams.get('query');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      filteredPeople = filteredPeople.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter(person => {
        let result = false;

        centuries.forEach(century => {
          if (
            person.born / 100 > +century - 1 &&
            person.born / 100 < +century
          ) {
            result = true;

            return;
          }
        });

        return result;
      });
    }

    if (sort) {
      switch (sort) {
        case 'sex':
        case 'name':
          return filteredPeople.sort((person1, person2) => {
            return order
              ? person2[sort].localeCompare(person1[sort])
              : person1[sort].localeCompare(person2[sort]);
          });
        case 'born':
        case 'died':
          return filteredPeople.sort((person1, person2) => {
            return order
              ? person2[sort] - person1[sort]
              : person1[sort] - person2[sort];
          });
        default:
          return filteredPeople;
      }
    }

    return filteredPeople;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {!isLoading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {false && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {errorMessage.length > 0 ? (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {errorMessage}
                    </p>
                  ) : (
                    <PeopleTable peopleList={visiblePeopleList()} />
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
