import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Human, HumanWithParents } from '../../types/Human';
import { getPeople } from '../../api/people';
import { findHumanByName } from '../../functions/findHumanByName';
import { PeopleTable } from '../PeopleTable';

import './PeoplePage.scss';
import { useSearchParams } from '../../hooks/useSearchParams';
import { generateCallbackSort } from '../../functions/generateCallbackSort';

export const PeoplePage: React.FC<{}> = React.memo(() => {
  const [people, setPeople] = useState<Array<HumanWithParents> | null>(null);

  let peopleToShow: Array<HumanWithParents> = [];

  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const currentSortBy = searchParams.get('sortBy') || '';
  const currentSortOrder = searchParams.get('sortOrder') || '';
  const callbackForSort = generateCallbackSort(currentSortBy, currentSortOrder);

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
    peopleToShow = peopleWithParents;
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);

  if (currentQuery) {
    const lowerQuery = currentQuery.toLowerCase();

    const filtered = people?.filter((human) => (
      human.name.toLowerCase().includes(lowerQuery)
      || human.motherName?.toLowerCase().includes(lowerQuery)
      || human.fatherName?.toLowerCase().includes(lowerQuery)
    ))
    || [];

    peopleToShow = filtered;
  } else {
    peopleToShow = people || [];
  }

  if (currentSortBy) {
    peopleToShow = [...peopleToShow].sort(callbackForSort);
  }

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
                  value={currentQuery}
                  onChange={({ target }) => {
                    const { value } = target;

                    if (value) {
                      searchParams.set('query', target.value);
                    } else {
                      searchParams.delete('query');
                    }

                    navigate(`?${searchParams.toString()}`);
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
