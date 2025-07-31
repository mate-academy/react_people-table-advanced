import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const peopleList = [...people];
  let filteredList = [...peopleList];

  useEffect(() => {
    getPeople()
      .then(json => setPeople(json))
      .then(() => setIsLoading(false))
      .catch(() => setError(true));
  }, []);

  if (searchParams.get('query')) {
    const query: string | undefined = searchParams
      .get('query')
      ?.toLocaleLowerCase();

    if (query) {
      filteredList = filteredList.filter(
        person =>
          person.name.toLocaleLowerCase().includes(query) ||
          person.fatherName?.toLocaleLowerCase().includes(query) ||
          person.motherName?.toLocaleLowerCase().includes(query),
      );
    }
  }

  switch (searchParams.get('sex')) {
    case 'm':
      filteredList = filteredList.filter(person => person.sex === 'm');
      break;
    case 'f':
      filteredList = filteredList.filter(person => person.sex === 'f');
      break;
  }

  if (searchParams.getAll('centuries').length > 0) {
    let cents = searchParams.getAll('centuries');

    cents = cents.map(cent => `${+cent - 1}`);

    filteredList = filteredList.filter(per =>
      cents.includes(per.born.toString().slice(0, 2)),
    );
  }

  switch (searchParams.get('sort')) {
    case 'name':
      filteredList.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'sex':
      filteredList.sort((a, b) => a.sex.localeCompare(b.sex));
      break;
    case 'born':
      filteredList.sort((a, b) => a.born - b.born);
      break;

    case 'died':
      filteredList.sort((a, b) => a.died - b.died);
      break;
  }

  if (searchParams.get('order') === 'desc') {
    filteredList.reverse();
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : isLoading ? (
                <Loader />
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : filteredList.length > 0 ? (
                <PeopleTable people={filteredList} slug={slug} />
              ) : (
                <p>There are no people matching the current search criteria</p>
              )}
              {}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
