import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../../types';
import { ErrorType } from '../../types/ErrorTypes';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';
import { sortPersons } from '../../utils/sortHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorFetch, setErrorFetch] =
    useState<ErrorType.peopleLoadingError | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') === 'desc' ? 'desc' : null;
  const sexFilterParams = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const visiblePeople = useMemo(() => {
    let peopleCopy = [...people];

    peopleCopy = peopleCopy.filter(person => {
      if (sexFilterParams && person.sex !== sexFilterParams) {
        return false;
      }

      if (query) {
        const queryNormalaize = query.toLowerCase();
        const name = person.name.toLowerCase();
        const mother = person.motherName?.toLowerCase() || '';
        const father = person.fatherName?.toLowerCase() || '';

        if (
          !name.includes(queryNormalaize) &&
          !mother.includes(queryNormalaize) &&
          !father.includes(queryNormalaize)
        ) {
          return false;
        }
      }

      if (centuries.length) {
        const PersonCentury = Math.ceil(person.born / 100);
        const numCenturies = centuries.map(century => Number(century));

        if (!numCenturies.includes(PersonCentury)) {
          return false;
        }
      }

      return true;
    });

    peopleCopy = sort
      ? peopleCopy.sort((a, b) => sortPersons(a, b, sort))
      : peopleCopy;

    if (order) {
      peopleCopy.reverse();
    }

    return peopleCopy;
  }, [people, sexFilterParams, query, centuries, sort, order]);

  useEffect(() => {
    const getAllPeople = async () => {
      setErrorFetch(null);
      setLoading(true);

      try {
        const peopleArr = await getPeople();

        setPeople(peopleArr);
      } catch {
        setErrorFetch(ErrorType.peopleLoadingError);
      } finally {
        setLoading(false);
      }
    };

    getAllPeople();
  }, []);

  const visibleContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (errorFetch) {
      return <p data-cy="peopleLoadingError">{errorFetch}</p>;
    }

    if (people.length === 0) {
      return <p data-cy="noPeopleMessage">{ErrorType.noPeopleMessage}</p>;
    }

    if (visiblePeople.length === 0) {
      return <p>{ErrorType.searchCriteria}</p>;
    }

    return (
      <PeopleTable
        people={visiblePeople}
        sort={sort}
        order={order}
        searchParams={searchParams}
      />
    );
  };

  const loadingPeopleFiltr =
    !loading && errorFetch === null && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {loadingPeopleFiltr && (
              <PeopleFilters
                sexFilterParams={sexFilterParams}
                query={query}
                centuries={centuries}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">{visibleContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
};
