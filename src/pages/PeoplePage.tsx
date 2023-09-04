import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from '../components/PeopleFilters';
import { filterData } from '../utils/filterData';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const fullPeopleData = (peopleArray: Person[]) => {
    return peopleArray.map((person) => {
      const mother = peopleArray.find(
        (human) => human.name === person.motherName,
      );
      const father = peopleArray.find(
        (human) => human.name === person.fatherName,
      );

      return Object.assign(person, { mother, father });
    });
  };

  const getDataPeoples = async () => {
    try {
      const data = await getPeople();
      const newData = fullPeopleData(data);

      setPeopleData(newData);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getDataPeoples();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {peopleData !== null && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {(peopleData === null && !isError) && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(peopleData && !peopleData.length) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!peopleData?.length && (
                filterData(peopleData, searchParams).length
                  ? (
                    <PeopleTable
                      peopleData={peopleData}
                      selectedPerson={slug}
                      searchParams={searchParams}
                    />
                  ) : (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
