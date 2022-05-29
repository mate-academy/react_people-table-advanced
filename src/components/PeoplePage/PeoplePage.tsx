import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';
import { Human, HumanWithParents } from '../../types/Human';
import { getPeople } from '../../api/people';
import { findHumanByName } from '../../functions/findHumanByName';
import { PeopleTable } from '../PeopleTable';

import './PeoplePage.scss';

export const PeoplePage: React.FC<{}> = React.memo(() => {
  const [people, setPeople] = useState<Array<HumanWithParents> | null>(null);

  const [peopleToShow, setPeopleToShow]
    = useState<Array<HumanWithParents> | null>(null);

  const navigate = useNavigate();
  const queries = useQuery();

  const [query, setQuery] = useState('');

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
    setPeopleToShow(peopleWithParents);
    setQuery(queries.get('query') || '');
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);

  useEffect(() => {
    if (query) {
      const lowerQuery = query.toLowerCase();

      const filtered = people?.filter((human) => (
        human.name.toLowerCase().includes(lowerQuery)
        || human.motherName?.toLowerCase().includes(lowerQuery)
        || human.fatherName?.toLowerCase().includes(lowerQuery)
      ))
      || [];

      setPeopleToShow(filtered);
    } else {
      setPeopleToShow(people);
    }
  }, [query]);

  return (
    <div className="PeoplePage">
      { peopleToShow
        ? (
          <>
            <div className="PeoplePage__search-query-block">
              <label>
                Filter by name:
                <input
                  type="text"
                  value={query}
                  onChange={({ target }) => {
                    const { value } = target;

                    if (value) {
                      navigate(`?query=${value}`);
                    } else {
                      navigate('');
                    }

                    setQuery(value);
                  }}
                />
              </label>
            </div>

            <PeopleTable people={peopleToShow} />
          </>
        )
        : (
          <div className="PeoplePage__loader-spinner-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
    </div>
  );
});
