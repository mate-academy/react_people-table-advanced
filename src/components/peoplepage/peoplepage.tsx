import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../peopletable/peopletable';
import { PeopleFilters } from '../PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [person, setPerson] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [serveAlone, setServeAlone] = useState<boolean>(false);

  const getError = (message: string) => setErrorMessage(message);

  useEffect(() => {
    setErrorMessage('');
    setIsloading(true);
    getPeople()
      .then(people => {
        setPerson(people);
        setIsloading(false);
      })
      .catch(() => getError('Something went wrong'))
      .finally(() => setServeAlone(true));
  }, []);

  const { slug } = useParams();
  const selectedUser = slug;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {serveAlone && <PeopleFilters person={person} />}
          </div>

          <div className="column">
            <div className="box table-container">
              <PeopleTable
                setPerson={setPerson}
                person={person}
                errorMessage={errorMessage}
                isLoading={isLoading}
                serveAlone={serveAlone}
                selectedUser={selectedUser}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
