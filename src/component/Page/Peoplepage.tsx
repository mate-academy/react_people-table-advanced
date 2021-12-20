import React, { useState, useEffect } from 'react';
import { People } from '../../types/People';
import { getPeople } from '../../utils/api';
import Spinner from '../Loader/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [peopleServer, setPeopleServer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(people => {
        setPeopleServer(people.map((person: People) => {
          const father = people.find((el: People) => person.fatherName === el.name);
          const mother = people.find((el: People) => person.motherName === el.name);

          return { ...person, father, mother };
        }));
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1>People Page</h1>

      {
        isLoading ? (
          <div className="spinner-wrapper">
            <Spinner />
          </div>
        ) : (
          <PeopleTable peopleServer={peopleServer} />
        )
      }
    </>
  );
};
