import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { getPeople } from '../api';
import { Person } from '../types';
import { NoPeopleMessage } from '../components/NoPeopleMessage';
import { PeopleLoadingError } from '../components/PeopleLoadingError';
import {
  formatArrayOfPeoples,
} from '../utils/helper';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();
  const { slug = '' } = useParams();

  const fetchPeoples = async () => {
    try {
      const peoplesFromServer = await getPeople();

      setPeoples(peoplesFromServer);
    } catch {
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchPeoples();
  }, []);

  const filteredPeoples = peoples
    ? formatArrayOfPeoples(peoples, searchParams)
    : peoples;
  const isInitialPeoplesEmpty = peoples && !peoples.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {peoples && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {peoples ? (
                <PeopleTable selectedSlug={slug} peoples={filteredPeoples} />
              ) : (
                <Loader />
              )}

              {hasError && (
                <PeopleLoadingError />
              )}

              {isInitialPeoplesEmpty && (
                <NoPeopleMessage />
              )}

              {(!filteredPeoples?.length) && (
                <p>There are no people matching the current search criteria</p>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
