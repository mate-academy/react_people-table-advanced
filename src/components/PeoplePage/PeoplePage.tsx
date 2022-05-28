import React, { useCallback, useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Human, HumanWithParents } from '../../types/Human';
import { getPeople } from '../../api/people';
import { findHumanByName } from '../../functions/findHumanByName';
import { PeopleTable } from '../PeopleTable';

import './PeoplePage.scss';

export const PeoplePage: React.FC<{}> = React.memo(() => {
  const [people, setPeople] = useState<Array<HumanWithParents> | null>(null);

  const loadPeople = useCallback(async () => {
    const loadedPeople: Array<Human> = await getPeople();
    const peopleWithParents: Array<HumanWithParents> = loadedPeople.map(
      human => ({
        ...human,
        mother: findHumanByName(human.motherName, loadedPeople),
        father: findHumanByName(human.fatherName, loadedPeople),
      }),
    );

    setPeople(peopleWithParents);
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <div className="PeoplePage">
      { people
        ? (
          <PeopleTable people={people} />
        )
        : (
          <div className="PeoplePage__loader-spinner-container">
            <TailSpin
              height="50"
              width="50"
              color="grey"
              ariaLabel="loading"
            />
          </div>
        )}
    </div>
  );
});
