import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isSpinnerShown, setIsSpinnerShown] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const isErrorMessageShown = errorMessage && !isSpinnerShown;
  const isPeopleListEmpty = !people.length && !errorMessage && !isSpinnerShown;

  const filteredAndSortedPeople = people.filter(person => {
    let sexFiltered = true;
    let queryFiltered = true;
    let centuryFiltered = false;

    if (sex) {
      sexFiltered = person.sex === sex;
    }

    if (query) {
      queryFiltered = person.name.toLowerCase()
        .includes(query.toLowerCase())
        || (person.fatherName || person.name).toLowerCase()
          .includes(query.toLowerCase())
        || (person.motherName || person.name).toLowerCase()
          .includes(query.toLowerCase());
    }

    if (!centuries.length) {
      centuryFiltered = true;
    } else {
      centuries.forEach(century => {
        if (person.born > +century * 100 - 100
          && person.born <= +century * 100) {
          centuryFiltered = true;
        }
      });
    }

    return sexFiltered && queryFiltered && centuryFiltered;
  }).sort((p1, p2) => {
    if (sort) {
      switch (sort) {
        case 'name': {
          if (order) {
            return p2.name.localeCompare(p1.name);
          }

          return p1.name.localeCompare(p2.name);
        }

        case 'sex': {
          if (order) {
            return p2.sex.localeCompare(p1.sex);
          }

          return p1.sex.localeCompare(p2.sex);
        }

        case 'born': {
          if (order) {
            return p2.born - p1.born;
          }

          return p1.born - p2.born;
        }

        case 'died': {
          if (order) {
            return p2.died - p1.died;
          }

          return p1.died - p2.died;
        }

        default: {
          return 0;
        }
      }
    }

    return 0;
  });

  useEffect(() => {
    getPeople()
      .then(value => {
        const peopleWithParents = value.map(person => {
          const newPerson = { ...person };

          if (newPerson.motherName) {
            newPerson.mother = value.find(p => p.name === newPerson.motherName);
          }

          if (newPerson.fatherName) {
            newPerson.father = value.find(p => p.name === newPerson.fatherName);
          }

          return newPerson;
        });

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setErrorMessage('Error');
      })
      .finally(() => {
        setIsSpinnerShown(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isSpinnerShown && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isSpinnerShown && (
                <Loader />
              )}

              {isErrorMessageShown && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isPeopleListEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isSpinnerShown && (
                <PeopleTable people={filteredAndSortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
