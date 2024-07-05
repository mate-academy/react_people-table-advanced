import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [filteredPeopleList, setFilteredPeopleList] = useState<Person[]>([]);
  const [reqState, setReqState] = useState('loading');

  useEffect(() => {
    getPeople()
      .then((data: Person[]) => {
        if (data.length === 0) {
          return [];
        }

        const treatedData = data.map(e => {
          const motherSlug = data.find(el => el.name === e.motherName)?.slug;
          const fatherSlug = data.find(el => el.name === e.fatherName)?.slug;

          return { ...e, motherSlug: motherSlug, fatherSlug: fatherSlug };
        });

        return treatedData;
      })
      .then(data => {
        setPeopleFromServer(data);
        setFilteredPeopleList(data);
        setReqState('success');
      })
      .catch(() => {
        setReqState('error');
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {reqState === 'loading' ? (
          <Loader />
        ) : reqState === 'error' ? (
          <p data-cy="peopleLoadingError">Something went wrong</p>
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                setFilteredPeopleList={setFilteredPeopleList}
                fullPeopleList={peopleFromServer}
              />
            </div>

            <div className="column">
              <div className="box table-container">
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>

                <p>There are no people matching the current search criteria</p>

                <PeopleTable filteredPeopleList={filteredPeopleList} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
