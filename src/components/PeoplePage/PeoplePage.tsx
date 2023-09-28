import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { PeopleContext } from '../../contexts/PeopleContext';
import { PeopleFilters } from '../PeopleFilters';
import { SearchParms } from '../../types/SearchParams';
import { SortFields } from '../../types/SortFields';

export const PeoplePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { people, setPeople } = useContext(PeopleContext);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);

  const isShowLoad = isLoad && !isError && !people.length;
  const isShowError = !isLoad && isError && !people.length;
  const isShowNoPeople = !isLoad && !isError && !people.length;
  const isShowPeople = !isLoad && !isError && !!people.length;

  useEffect(() => {
    setIsError(false);
    setIsLoad(true);

    (async () => {
      try {
        setPeople(await getPeople());
      } catch {
        setIsError(true);
      } finally {
        setIsLoad(false);
      }
    })();

    return () => setPeople([]);
  }, []);

  const getModifiedPeople = () => {
    const strSearchParams = searchParams?.toString();

    if (!strSearchParams) {
      return people;
    }

    const sortOrder = searchParams.has(SearchParms.Order) ? -1 : 1;
    const sortKey = searchParams.get(SearchParms.Sort);

    const modifiedPeople = people.slice().sort((person1, person2) => {
      switch (sortKey) {
        case SortFields.Name:
        case SortFields.Sex:
          return person1[sortKey].localeCompare(person2[sortKey]) * sortOrder;
        case SortFields.Born:
        case SortFields.Died:
          return (person1[sortKey] - person2[sortKey]) * sortOrder;
        default:
          return 0;
      }
    });

    const sexFilterParam = searchParams.get(SearchParms.Sex);
    const centuriesFilterParam = searchParams.get(SearchParms.Centuries);
    const queryFilterParam = searchParams.get(SearchParms.Query);

    if (!sexFilterParam && !centuriesFilterParam && !queryFilterParam) {
      return modifiedPeople;
    }

    return modifiedPeople.filter(({
      sex,
      name,
      fatherName,
      motherName,
      born,
    }) => {
      let centuryCondition = true;

      if (centuriesFilterParam) {
        const centuriesList = searchParams.getAll(SearchParms.Centuries);

        centuryCondition = centuriesList
          .includes((born + 100).toString().slice(0, 2));
      }

      let sexCondition = true;

      if (sexFilterParam) {
        sexCondition = sex === sexFilterParam;
      }

      let queryCondition = true;

      if (queryFilterParam) {
        const validSexParam = queryFilterParam.trim().toLowerCase();

        queryCondition = name.toLowerCase().includes(validSexParam)
          || !!fatherName?.toLowerCase().includes(validSexParam)
          || !!motherName?.toLowerCase().includes(validSexParam);
      }

      return centuryCondition && sexCondition && queryCondition;
    });
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isShowPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {isShowLoad && <Loader />}

              {isShowError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isShowNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isShowPeople && <PeopleTable people={getModifiedPeople()} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
