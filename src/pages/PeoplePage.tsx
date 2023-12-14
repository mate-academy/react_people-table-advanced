import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PeopleFilters } from "../components/PeopleFilters";
import { Loader } from "../components/Loader";
import { PeopleTable } from "../components/PeopleTable";
import { Person } from "../types";
import { getPeople } from "../api";
import { filterPeople } from "../utils/filterPeople";
import { preparePeople } from "../helpers/preparePeople";

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get("sex");
  const query = searchParams.get("query");
  const centuries = searchParams.getAll("centuries");
  const sortField = searchParams.get("sort");
  const isReversed = searchParams.get("order") === "desc";

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((data) => {
        setPeople(preparePeople(data));
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = filterPeople(
    people,
    query,
    sex,
    centuries,
    sortField,
    isReversed
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length && !visiblePeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!visiblePeople.length && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
