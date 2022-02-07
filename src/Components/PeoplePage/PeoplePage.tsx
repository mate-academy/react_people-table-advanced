import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import './PeoplePage.scss';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then(peopleList => (
      setPeople(peopleList)
    ));
  }, []);

  return (
    <div className="section people__page">
      <h2>People page</h2>
      {people.length > 0 && <PeopleTable people={people} />}
    </div>
  );
};
