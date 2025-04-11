import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleTable } from '../../components/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { Loader } from '../../components/Loader';

import { getPeople } from '../../api';

import { allCenturies, FILTER_PARAMS } from '../../constants/filterConstants';
import { SORT_PEOPLE_PARAMS, SortParams } from '../../constants/sortConstants';

import { Person } from '../../types';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingPeople, setLoadingPeople] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [searchParams] = useSearchParams();

  const enrichedPeople = useMemo(() => {
    return people.map(person => {
      const mother =
        person.motherName &&
        people.find(p => p.name === person.motherName && p.born < person.born);

      const father =
        person.fatherName &&
        people.find(p => p.name === person.fatherName && p.born < person.born);

      return {
        ...person,
        ...(mother && { mother }),
        ...(father && { father }),
      };
    });
  }, [people]);

  const filteredPeople = useMemo(() => {
    const normalisedQuery =
      searchParams.get(FILTER_PARAMS.QUERY.KEY)?.trim().toLowerCase() || '';

    const centuries =
      searchParams.getAll(FILTER_PARAMS.CENTURIES.KEY).length === 0
        ? allCenturies
        : searchParams.getAll(FILTER_PARAMS.CENTURIES.KEY);

    const sex = searchParams.get(FILTER_PARAMS.SEX.KEY);

    return enrichedPeople.filter(person => {
      const matchesQuery =
        person.name.trim().toLowerCase().includes(normalisedQuery) ||
        person.motherName?.trim().toLowerCase().includes(normalisedQuery) ||
        person.fatherName?.trim().toLowerCase().includes(normalisedQuery);

      const matchesCentury = centuries.some(
        century => Math.ceil(person.born / 100) === +century,
      );

      const matchesSex = sex ? person.sex === sex : true;

      return matchesQuery && matchesCentury && matchesSex;
    });
  }, [enrichedPeople, searchParams]);

  const preparedPeople = useMemo(() => {
    const sortBy = searchParams.get(SORT_PEOPLE_PARAMS.SORT.KEY);
    const order = searchParams.get(SORT_PEOPLE_PARAMS.ORDER.KEY);
    const isDesc = Boolean(order);

    return [...filteredPeople].sort((a, b) => {
      switch (sortBy) {
        case SortParams.NAME:
          return isDesc
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
        case SortParams.SEX:
          return isDesc
            ? b.sex.localeCompare(a.sex)
            : a.sex.localeCompare(b.sex);
        case SortParams.BORN:
          return isDesc ? b.born - a.born : a.born - b.born;
        case SortParams.DIED:
          return isDesc ? b.died - a.died : a.died - b.died;
        default:
          return 0;
      }
    });
  }, [filteredPeople, searchParams]);

  const getAllPeople = async () => {
    setLoadingPeople(true);

    try {
      const peopleData = await getPeople();

      setPeople(peopleData);
    } catch {
      setError('Something went wrong');
    } finally {
      setLoadingPeople(false);
    }
  };

  useEffect(() => {
    getAllPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loadingPeople && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!preparedPeople.length &&
                !searchParams.get(FILTER_PARAMS.QUERY.KEY) &&
                !loadingPeople && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

              {searchParams.get(FILTER_PARAMS.QUERY.KEY) &&
                preparedPeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!loadingPeople && !error && preparedPeople.length > 0 && (
                <PeopleTable
                  people={preparedPeople}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
