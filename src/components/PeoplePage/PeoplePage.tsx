import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';

import { IPerson } from '../../Interfaces/Interfaces';
import PeopleTable from '../PeopleTable/PeopleTable';

const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then((people) => {
      const peopleWithParents = people.map((person: IPerson) => {
        person.mother = person.motherName;
        person.father = person.fatherName;
        return person;
      });
      setPeople(peopleWithParents);
    });
  }, []);

  return (
    <div className="peoplePage">
      <PeopleTable people={people} />
    </div>
  );
};

export default PeoplePage;
