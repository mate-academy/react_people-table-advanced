import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../../api';
import { getPreparedPeople } from '../../utils/getPreparedPeople';
import { getSearchWith } from '../../utils/searchHelper';

import { Person, SearchParams } from '../../types';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isErrorShowing, setIsErrorShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);
    setSearchParams(search);
  };

  const handleSexChange = (choosedSex: string | null) => {
    setSearchWith({ sex: choosedSex });
  };

  const handleQueryChange = (searchedQuery: string) => {
    setSearchWith({ query: searchedQuery });
  };

  const toggleCenturies = (selectedCentury: string) => {
    return centuries.includes(selectedCentury)
      ? centuries.filter(century => century !== selectedCentury)
      : [...centuries, selectedCentury];
  };

  const preparedPeople = getPreparedPeople(peopleFromServer);
  const hasPeopleOnServer =
    !preparedPeople.length && !isLoading && !isErrorShowing;

  const getFilterdPeople = () => {
    let filteredPeople = [...preparedPeople];

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      filteredPeople = filteredPeople.filter(person => {
        const normalizedName = person.name.toLowerCase().trim();
        const normalizedFatherName = person.fatherName?.toLowerCase().trim();
        const normalizedMotherName = person.motherName?.toLowerCase().trim();

        return (
          normalizedName.includes(normalizedQuery) ||
          normalizedFatherName?.includes(normalizedQuery) ||
          normalizedMotherName?.includes(normalizedQuery)
        );
      });
    }

    if (!!centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        const century = String(Math.ceil(person.born / 100));

        return centuries.includes(century);
      });
    }

    return filteredPeople;
  };

  const visiblePeople = getFilterdPeople();

  useEffect(() => {
    getPeople()
      .then(setPeopleFromServer)
      .catch(setIsErrorShowing)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                choosedSex={sex}
                searchedQuery={query}
                choosedCenturies={centuries}
                onSexChange={handleSexChange}
                onQueryChange={handleQueryChange}
                onCenturiesToggle={toggleCenturies}
              />
            )}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isErrorShowing && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {hasPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
