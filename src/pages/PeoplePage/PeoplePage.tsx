import {
  FC,
  memo,
  useEffect,
  useState,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { Person } from '../../types/Person';
import { PeopleTable } from '../../components/PeopleTable';
import { preparePeople } from '../../utils/preparePeople';
import { PeopleFilters } from '../../components/PeopleFilters';
import { filterPeopleBySex } from '../../utils/filterPeopleBySex';
import { filterPeopleByQuery } from '../../utils/filterPeopleByQuery';
import { filterPeopleByCenturies } from '../../utils/filterPeopleByCenturies';
import { sortPeople } from '../../utils/sortPeope';

export const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [
    filteredAndSortedPeople,
    setFilteredAndSortedPeople,
  ] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [error, setError] = useState(false);
  const { selectedPersonSlug = '0' } = useParams();
  const [searchParams] = useSearchParams();

  const loadPeople = async () => {
    try {
      const peopleFromServer = await getPeople();
      const preparedPeopleFromServer = preparePeople(peopleFromServer);

      setFilteredAndSortedPeople(preparedPeopleFromServer);
      setPeople(preparedPeopleFromServer);
    } catch {
      setError(true);
    } finally {
      setIsPeopleLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const params = {
    sex: searchParams.get('sex'),
    query: searchParams.get('query'),
    centuries: searchParams.getAll('centuries'),
    sort: searchParams.get('sort'),
    order: searchParams.get('order'),
  };

  useEffect(() => {
    let currentFilteredPeople = [...people];

    if (params.sex) {
      currentFilteredPeople = filterPeopleBySex(
        currentFilteredPeople,
        params.sex,
      );
    }

    if (params.query) {
      currentFilteredPeople = filterPeopleByQuery(
        currentFilteredPeople,
        params.query,
      );
    }

    if (params.centuries.length) {
      currentFilteredPeople = filterPeopleByCenturies(
        currentFilteredPeople,
        params.centuries,
      );
    }

    if (params.sort) {
      currentFilteredPeople = sortPeople(
        currentFilteredPeople,
        params.sort,
        params.order,
      );
    }

    setFilteredAndSortedPeople(currentFilteredPeople);
  }, [searchParams, people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isPeopleLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(people.length === 0 && !isPeopleLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && (
                <PeopleTable
                  people={filteredAndSortedPeople}
                  selectedPersonSlug={selectedPersonSlug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
