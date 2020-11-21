import React, { useEffect, useContext } from 'react';
import { getPeople } from '../../api';
import { AppContext } from '../../Context/Context';
import { IPerson } from '../../Interfaces/Interfaces';
import PeopleTable from '../PeopleTable/PeopleTable';
import Filter from '../Filter/Filter';

const PeoplePage = () => {
  const { people, setPeople } = useContext(AppContext);

  useEffect(() => {
    getPeople().then((people) => {
      const peopleWithParents = people.map((person: IPerson) => {
        person.mother = person.motherName;
        person.father = person.fatherName;
        return person;
      });
      setPeople(peopleWithParents);
    });
  }, [setPeople]);

  return (
    <div className="peoplePage">
      <Filter />
      <PeopleTable people={people} />
    </div>
  );
};

export default PeoplePage;
