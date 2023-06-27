import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: React.FC<{}> = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  let visiblePeople = [...people];

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const sorting = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setPeople(await getPeople());
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const isErrorMessageVisible = !isLoading && error;
  const isPeopleTableVisible = !isLoading && !error && people.length > 0;

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    visiblePeople = visiblePeople
      .filter(person => {
        const searchFilter = `${person.motherName?.toLowerCase()}${person.fatherName?.toLowerCase()}${person.name.toLowerCase()}`;

        return searchFilter.includes(query.toLowerCase());
      });
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      return centuries
        .includes(String(Math.floor((person.born - 1) / 100) + 1));
    });
  }

  if (sorting) {
    switch(sorting) {
      case 'name':
      case 'sex':
        visiblePeople = visiblePeople.sort((a, b) => {
          return a[sorting].localeCompare(b[sorting]);
        });
        break;
      case 'born':
      case 'died':
        visiblePeople = visiblePeople.sort((a, b) => {
          return a[sorting] - b [sorting];
        });
        break;
      default:
        break;
    }
  }

  if (order) {
    visiblePeople = visiblePeople.reverse();
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              sex={sex}
            />
          </div>

          <div className="column">
            {isLoading && <Loader />}

            {isErrorMessageVisible
              && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

            {isPeopleTableVisible
              && <PeopleTable people={visiblePeople} />}
          </div>
        </div>
      </div>
    </>
  );
};
