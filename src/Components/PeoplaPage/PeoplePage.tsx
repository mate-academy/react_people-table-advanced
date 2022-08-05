import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../People';
import PeopleTable from '../PeopleTable/PeopleTable';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await getPeople();

      setPeople(response);
    };

    fetchPeople().catch((requestError) => {
      throw new Error(requestError);
    });
  }, []);

  return (
    <div className="people">
      <h1 className="is-size-1 has-text-centered">People table</h1>
      <PeopleTable people={people} />
    </div>
  );
};

export default PeoplePage;
