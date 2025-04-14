import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/Table/PeopleTable';
import { PeopleFilters } from '../../components/Filter/PeopleFilter';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilterParams, SexFilterValue } from '../../types/FilterParams';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchParams] = useSearchParams();

  const [filterParams, setFilterParams] = useState<PeopleFilterParams>({});

  const getFilteredPeopleList = useCallback(() => {
    return peopleList?.filter(person => {
      if (filterParams.sex) {
        if (person.sex !== filterParams.sex) {
          return false;
        }
      }

      if (filterParams.query) {
        const lowerQuery = filterParams.query.toLowerCase();
        const fullName =
          `${person.name} ${person.fatherName} ${person.motherName}`.toLowerCase();

        if (!fullName.includes(lowerQuery)) {
          return false;
        }
      }

      if (filterParams.centuries && person.born) {
        const bornYear = +person.born;

        if (!isNaN(bornYear)) {
          const centuryStart = (+filterParams.centuries - 1) * 100 + 1;
          const centuryEnd = centuryStart + 99;

          if (bornYear < centuryStart || bornYear > centuryEnd) {
            return false;
          }
        }
      }

      return true;
    });
  }, [filterParams, peopleList]);

  const renderContent = () => {
    const filteredPeople = getFilteredPeopleList();

    if (errorMessage) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (!filteredPeople) {
      return <Loader />;
    }

    if (!filteredPeople.length) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    return <PeopleTable peopleList={filteredPeople} />;
  };

  const callGetRequest = async () => {
    try {
      const peopleFromServer = await getPeople();
      const deepCopy = peopleFromServer.map(person => ({
        ...person,
        mother: peopleFromServer.find(
          mother => mother.name === person.motherName,
        ),
        father: peopleFromServer.find(
          father => father.name === person.fatherName,
        ),
      }));

      setPeopleList(deepCopy);
    } catch {
      setErrorMessage(true);
    }
  };

  useEffect(() => {
    callGetRequest();
  }, []);

  useEffect(() => {
    const newFilterParams: PeopleFilterParams = {
      sex: searchParams.get('sex') as SexFilterValue,
      query: searchParams.get('query'),
      centuries: searchParams.get('centuries'),
    };

    setFilterParams(newFilterParams);
  }, [searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleList && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">{renderContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
};
