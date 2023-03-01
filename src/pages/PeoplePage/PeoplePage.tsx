import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { PeopleFilters } from '../../components/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { slug = '' } = useParams();

  const handleGettingPeople = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();
      const updatedPeople = peopleFromServer.map(person => (
        {
          ...person,
          mother: peopleFromServer
            .find(mother => mother.name === person.motherName),
          father: peopleFromServer
            .find(father => father.name === person.fatherName),
        }
      ));

      setPeople(updatedPeople);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleGettingPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">

          <div className="column is-7-tablet is-narrow-desktop">
            {people && !isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">

              {isLoading && <Loader />}

              {!people.length && isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isError && !isLoading
              && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0
              && (<PeopleTable people={people} selectedSlug={slug} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
