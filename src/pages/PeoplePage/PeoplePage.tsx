import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/Table/PeopleTable';
import { PeopleFilters } from '../../components/Filter/PeopleFilter';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilterParams } from '../../types/FilterParams';
import { PersonSex } from '../../constants/PersonSex';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchParams] = useSearchParams();
  const [filterParams, setFilterParams] = useState<PeopleFilterParams>({});

  const getFilteredPeopleList = useCallback(() => {
    return peopleList?.filter(person => {
      const bySex = !filterParams.sex || filterParams.sex === person.sex;

      const byInput =
        !filterParams.query ||
        `${person.name} ${person.fatherName} ${person.motherName}`
          .toLowerCase()
          .includes(filterParams.query.toLowerCase());

      const personCentury = Math.ceil(person.born / 100);

      const byCentury =
        !filterParams.centuries?.length ||
        filterParams.centuries.includes(personCentury.toString());

      return bySex && byInput && byCentury;
    });
  }, [filterParams, peopleList]);

  const validPeopleList = getFilteredPeopleList();

  useEffect(() => {
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

    callGetRequest();
  }, []);

  useEffect(() => {
    const newFilterParams: PeopleFilterParams = {
      sex: searchParams.get('sex') as PersonSex,
      query: searchParams.get('query'),
      centuries: searchParams.getAll('centuries'),
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
            <div className="box table-container">
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!errorMessage && !validPeopleList && <Loader />}

              {validPeopleList && validPeopleList.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {validPeopleList && validPeopleList.length > 0 && (
                <PeopleTable peopleList={validPeopleList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
