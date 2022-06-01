import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { Human, HumanWithParents } from '../../types/Human';
import { getPeople } from '../../api/people';
import { findHumanByName } from '../../functions/findHumanByName';
import { PeopleTable } from '../PeopleTable';

import './PeoplePage.scss';
import { useSearchParams } from '../../hooks/useSearchParams';
import { generateCallbackSort } from '../../functions/generateCallbackSort';
import { FilterBy } from '../../enums/filterBy';

export const PeoplePage: React.FC<{}> = React.memo(() => {
  const [people, setPeople] = useState<Array<HumanWithParents> | null>(null);

  let peopleToShow: Array<HumanWithParents> = [];

  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(currentQuery);
  const [filterBy, setFilterBy] = useState(FilterBy.name);
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

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      navigate(`?${searchParams.toString()}`);
    }, 500), [],
  );

  if (currentQuery) {
    const lowerQuery = currentQuery.toLowerCase();

    switch (filterBy) {
      case FilterBy.name:
        peopleToShow = people?.filter((human) => (
          human.name.toLowerCase().includes(lowerQuery)
        ))
        || [];
        break;
      case FilterBy.motherName:
        peopleToShow = people?.filter((human) => (
          human.motherName?.toLowerCase().includes(lowerQuery)
        ))
        || [];
        break;
      case FilterBy.fatherName:
        peopleToShow = people?.filter((human) => (
          human.fatherName?.toLowerCase().includes(lowerQuery)
        ))
        || [];
        break;
      default:
        throw new Error('unexpected selected option to sort');
    }
  } else {
    peopleToShow = people || [];
  }

  if (currentSortBy) {
    const copyArr = [...peopleToShow];

    peopleToShow = copyArr.sort(callbackForSort);
  }

  return (
    <div className="PeoplePage">
      { people
        ? (
          <>
            <div className="PeoplePage__search-query-block">
              <label>
                Filter by:
                <select
                  onChange={({ target }) => {
                    setFilterBy(target.value as FilterBy);
                  }}
                  value={filterBy}
                  className="form-select form-select-sm PeoplePage__select"
                >
                  <option value={FilterBy.name}>
                    {FilterBy.name}
                  </option>

                  <option value={FilterBy.motherName}>
                    {FilterBy.motherName}
                  </option>

                  <option value={FilterBy.fatherName}>
                    {FilterBy.fatherName}
                  </option>
                </select>
              </label>

              <input
                id="query"
                className="form-control"
                type="text"
                value={query}
                onChange={({ target }) => {
                  const { value } = target;

                  setQuery(value);
                  applyQuery(value);
                }}
              />
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
