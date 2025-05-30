import { useEffect, useState } from 'react';
import { Person } from '../types';

import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [list, setList] = useState<Person[]>([]);
  const [isListLoading, setIsListLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();

  const getFilteredList = () => {
    let newList = [...list];

    if (searchParams.has('query')) {
      const query = searchParams.get('query');

      if (query) {
        newList = newList.filter(
          person =>
            person.name.toLowerCase().includes(query.toLowerCase()) ||
            person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
            person.fatherName?.toLowerCase().includes(query.toLowerCase()),
        );
      }
    }

    if (searchParams.has('sort')) {
      switch (searchParams.get('sort')) {
        case 'name': {
          if (searchParams.has('order')) {
            newList = newList.sort((person1, person2) =>
              person2.name.localeCompare(person1.name),
            );
          } else {
            newList = newList.sort((person1, person2) =>
              person1.name.localeCompare(person2.name),
            );
          }

          break;
        }

        case 'sex': {
          const allMales: Person[] = [];
          const allFemales: Person[] = [];

          list.forEach(person => {
            if (person.sex === 'f') {
              allFemales.push(person);
            } else {
              allMales.push(person);
            }
          });

          if (searchParams.has('order')) {
            newList = [...allMales, ...allFemales];
          } else {
            newList = [...allFemales, ...allMales];
          }

          break;
        }

        case 'born': {
          if (searchParams.has('order')) {
            newList = newList.sort(
              (person1, person2) => person2.born - person1.born,
            );
          } else {
            newList = newList.sort(
              (person1, person2) => person1.born - person2.born,
            );
          }

          break;
        }

        case 'died': {
          if (searchParams.has('order')) {
            newList = newList.sort(
              (person1, person2) => person2.died - person1.died,
            );
          } else {
            newList = newList.sort(
              (person1, person2) => person1.died - person2.died,
            );
          }

          break;
        }
      }
    }

    if (searchParams.has('centuries')) {
      const centuries = searchParams.getAll('centuries');

      newList = newList.filter(person =>
        centuries.some(century => Math.ceil(+person.born / 100) === +century),
      );
    }

    return newList;
  };

  const filteredList = getFilteredList();

  useEffect(() => {
    setIsListLoading(true);

    getPeople()
      .then(setList)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsListLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isListLoading && errorMessage === '' && <PeopleFilters />}
          </div>
          <div className="column">
            <div className="box table-container">
              {errorMessage !== '' ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              ) : (
                list?.length === 0 &&
                !isListLoading && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )
              )}

              {isListLoading && <Loader />}

              {!isListLoading && errorMessage === '' && (
                <PeopleTable people={filteredList} />
              )}

              {filteredList.length === 0 && !isListLoading && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
