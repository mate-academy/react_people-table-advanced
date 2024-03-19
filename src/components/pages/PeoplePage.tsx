import { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorShown, setIsErrorShown] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
        setIsErrorShown(false);
      } catch {
        setIsErrorShown(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return isLoading ? (
    <>
      <h1 className="title">People Page</h1>
      <Loader />
    </>
  ) : (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <PeopleTable
              people={people}
              isLoading={isLoading}
              isErrorShown={isErrorShown}
            />
          </div>
        </div>
      </div>
    </>
  );
};
