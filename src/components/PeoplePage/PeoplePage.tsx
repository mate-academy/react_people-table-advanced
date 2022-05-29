import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Human, HumanWithParents } from '../../types/Human';
import { getPeople } from '../../api/people';
import { findHumanByName } from '../../functions/findHumanByName';
import { PeopleTable } from '../PeopleTable';

import './PeoplePage.scss';
import { useSearchParams } from '../../hooks/useSearchParams';

export const PeoplePage: React.FC<{}> = React.memo(() => {
  const [people, setPeople] = useState<Array<HumanWithParents> | null>(null);

  const [peopleToShow, setPeopleToShow]
    = useState<Array<HumanWithParents> | null>(null);

  const navigate = useNavigate();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState('');
  // const [sortBy, setSortBy] = useState('');
  // const [sortType, setSortType] = useState('');

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
    setQuery(searchParams.get('query') || '');
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);

  useEffect(() => {
    if (query) {
      searchParams.set('query', query);

      const lowerQuery = query.toLowerCase();

      const filtered = people?.filter((human) => (
        human.name.toLowerCase().includes(lowerQuery)
        || human.motherName?.toLowerCase().includes(lowerQuery)
        || human.fatherName?.toLowerCase().includes(lowerQuery)
      ))
      || [];

      setPeopleToShow(filtered);
    } else {
      searchParams.delete('query');
      setPeopleToShow(people);
    }

    // console.log('change');

    navigate(`?${searchParams.toString()}`);
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
                  className="form-control"
                  type="text"
                  value={query}
                  onChange={({ target }) => {
                    setQuery(target.value);
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
