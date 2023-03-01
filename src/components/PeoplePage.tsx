import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const { slug = '' } = useParams();
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const [isError, setIsError] = useState(false);
  const centuries = searchParams.getAll('centuries');

  const getPeopleFromServer = async () => {
    setIsLoader(true);
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const getVisiblePeople = () => {
    let visiblePeople = [...people];

    if (query) {
      const correctQuery = query.toLowerCase();

      visiblePeople = visiblePeople
        .filter(person => person.name.toLowerCase().includes(correctQuery)
          || person.fatherName?.toLowerCase().includes(correctQuery)
          || person.motherName?.toLowerCase().includes(correctQuery));
    }

    if (sex) {
      switch (sex) {
        case 'Male':
          visiblePeople = visiblePeople.filter(person => person.sex === 'm');
          break;
        case 'Female':
          visiblePeople = visiblePeople.filter(person => person.sex === 'f');
          break;
        default:
          break;
      }
    }

    if (centuries.length) {
      visiblePeople = visiblePeople.filter(person => {
        const bornCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(bornCentury);
      });
    }

    return visiblePeople;
  };

  const filteredPeople = getVisiblePeople();

  useEffect(() => {
    getVisiblePeople();
  }, [query, sex]);

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoader && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {isLoader
                ? (
                  <Loader />
                )
                : (
                  <PeopleTable slug={slug} people={filteredPeople} />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
