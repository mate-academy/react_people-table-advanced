import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { People } from '../components/person';
import { Loader } from '../components/Loader';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Sorting } from '../components/sorting';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErroroMessage] = useState('');
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort')
  const order = searchParams.get('order')
  const sex = searchParams.get('sex')
  const query = searchParams.get('query')
  const centuries = searchParams.getAll('centuries')
  const location = useLocation();
  const currentPath = location.pathname;

  const arrayOfMothers = people.filter(person => person.sex === 'f');
  const arrayOfFathers = people.filter(person => person.sex === 'm');

  const peopleToRender = function () {
    let newArrayOfPeople = [...people]

    if (sort) {
      newArrayOfPeople.sort((a, b) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return a[sort].localeCompare(b[sort]);
          case 'born':
          case 'died':
            return a[sort] - b[sort];
          default:
            return 0
        }
      })
    }

    if (order) {
      newArrayOfPeople.reverse()
    }

    if (centuries.length > 0) {
      newArrayOfPeople = newArrayOfPeople.filter(a => {
        const bornCentury = Math.ceil(a.born / 100)
        return centuries.includes(bornCentury.toString())
      })
    }

    if (sex) {
      newArrayOfPeople = newArrayOfPeople.filter(a => a.sex === sex)
    }

    if (query) {
      const queryLower = query.toLowerCase()
      newArrayOfPeople = newArrayOfPeople.filter(a => {
        return a.name.toLowerCase().includes(queryLower) || a.fatherName?.toLowerCase().includes(queryLower) || a.motherName?.toLowerCase().includes(queryLower)
      })
    }

    return newArrayOfPeople
  }

  useEffect(() => {
    setErroroMessage('');
    setLoader(true);
    getPeople()
      .then(peopleArray => {
        setPeople(peopleArray);
      })
      .catch(() => setErroroMessage('Something went wrong'))
      .finally(() => setLoader(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loader && (<PeopleFilters />)}
          </div>
          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!loader &&
                !errorMessage &&
                (people.length !== 0 ? (
                  <table
                    data-cy="peopleTable"
                    className="table is-striped is-hoverable is-narrow is-fullwidth"
                  >{peopleToRender().length > 0 ? (
                    <>
                      <thead>
                        <Sorting />
                      </thead>
                      <tbody>
                        {peopleToRender().map(person => {
                          return (
                            <People
                              person={person}
                              fathers={arrayOfFathers}
                              mothers={arrayOfMothers}
                              currentPath={currentPath}
                              key={person.slug}
                            />
                          );
                        })}
                      </tbody>
                    </>
                  ) : (
                    <p data-cy="noPeopleMessage">There are no people matching the current search criteria</p>
                  )}

                  </table>
                ) : (
                  <p data-cy="noPeopleMessage">There are no people on the server</p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
