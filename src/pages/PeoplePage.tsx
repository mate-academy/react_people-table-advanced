import { FC, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { PeopleFilters } from '../components/PeopleFilters';
import { SortHeaders } from '../types/SortHeaders';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { selectedSlug = '' } = useParams();

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setVisiblePeople(peopleFromServer);
    } catch {
      setHasError(true);
    }
  };

  const noPeopleMessageShown = (
    !people.length
    && !isLoading
    && !hasError
  );

  const PeopleFiltersShown = (
    !!people.length
    && !isLoading
    && !hasError
  );

  const PeopleTableShown = (
    !!people.length
    && !!visiblePeople.length
    && !isLoading
    && !hasError
  );

  const noMatchMessageShown = (
    !!people.length
    && !visiblePeople.length
    && !isLoading
    && !hasError
  );

  const sortPeople = (peopleForSort: Person[]) => {
    if (!sort) {
      return peopleForSort;
    }

    const sortedPeople = [...peopleForSort].sort((personA, personB) => {
      const key = sort as SortHeaders;
      const [a, b] = !order ? [personA, personB] : [personB, personA];

      return (key === 'name' || key === 'sex')
        ? a[key].localeCompare(b[key])
        : a[key] - b[key];
    });

    return sortedPeople;
  };

  const filterPeopleByCenturies = (peopleForFilter: Person[]) => {
    if (!centuries.length) {
      return peopleForFilter;
    }

    const getCentury = (year: number) => Math.ceil(year / 100).toString();

    return peopleForFilter.filter(
      ({ born }) => centuries.includes(getCentury(born)),
    );
  };

  const filterPeopleBySex = (peopleForFilter: Person[]) => {
    if (!sex) {
      return peopleForFilter;
    }

    const filteredPeople = peopleForFilter.filter(({ sex: gender }) => (
      gender === sex
    ));

    return filteredPeople;
  };

  const filterPeopleByQuery = (peopleForFilter: Person[]) => {
    if (!query) {
      return peopleForFilter;
    }

    const isMatch = (value: string | null) => {
      if (!value) {
        return false;
      }

      return value.toLowerCase().includes(query.toLowerCase());
    };

    const filteredPeople = peopleForFilter.filter(
      ({ name, motherName, fatherName }) => (
        isMatch(name) || isMatch(motherName) || isMatch(fatherName)
      ),
    );

    return filteredPeople;
  };

  useEffect(() => {
    loadPeople();
  }, []);

  useEffect(() => {
    const sorted = sortPeople(people);
    const filteredBySex = filterPeopleBySex(sorted);
    const filteredByCenturies = filterPeopleByCenturies(filteredBySex);
    const filteredByQuery = filterPeopleByQuery(filteredByCenturies);

    setVisiblePeople(filteredByQuery);
  }, [searchParams]);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [people, hasError]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {noPeopleMessageShown && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {PeopleFiltersShown && (
            <PeopleFilters />
          )}

          {noMatchMessageShown && (
            <p>There are no people matching the current search criteria</p>
          )}

          {PeopleTableShown && (
            <>
              <PeopleTable
                people={visiblePeople}
                selectedSlug={selectedSlug}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
