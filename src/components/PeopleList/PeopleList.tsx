import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeopleList: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);

  async function loader() {
    const peopleFromServer = await getPeople();

    if (Array.isArray(peopleFromServer)) {
      const resultPeopleList = peopleFromServer
        .map((person, _, personList) => {
          const getMother = personList.find(PossiblyMother => (
            PossiblyMother.name === person.motherName
          ));
          const getFather = personList.find(PossiblyFather => (
            PossiblyFather.name === person.fatherName
          ));

          return {
            ...person,
            mother: getMother || null,
            father: getFather || null,
          };
        });

      setPeopleList(resultPeopleList);
    }
  }

  useEffect(() => {
    loader();
  }, []);

  return (

    <div className="container">
      { peopleList.length === 0
        ? <Loader />
        : <PeopleTable people={peopleList} />}
    </div>
  );
};
