import { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetch = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable
        people={people}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};
