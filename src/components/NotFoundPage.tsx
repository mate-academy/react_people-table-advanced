import { useEffect, useState } from 'react';
import PeopleTable from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} />
    </div>
  );
};

export default PeoplePage;
