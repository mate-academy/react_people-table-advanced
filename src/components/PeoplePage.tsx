import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [isPeopleLoadingError, setIsPeopleLoadingError] = useState(false);
  const [isNoPeopleMessage, setIsNoPeopleMessage] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || 'all';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const sortByParam = () => {
    if (sort === 'name') {
      return [...people].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === 'sex') {
      return [...people].sort((a, b) => a.sex.localeCompare(b.sex));
    }

    if (sort === 'born') {
      return [...people].sort((a, b) => a.born - b.born);
    }

    if (sort === 'died') {
      return [...people].sort((a, b) => a.died - b.died);
    }

    return [...people];
  };

  const filterBySex = (data: Person[]) => {
    if (sex === 'f') {
      return data.filter(person => person.sex === 'f');
    }

    if (sex === 'm') {
      return data.filter(person => person.sex === 'm');
    }

    return data;
  };

  const filterByCenturies = (data: Person[]) => {
    if (centuries.length > 0) {
      return data.filter(person => (
        centuries.includes(String(Math.ceil(person.born / 100)))));
    }

    return data;
  };

  const filterByQuery = (data: Person[]) => {
    if (query.trim().length > 0) {
      return data.filter(person => (
        person.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
        || `${(person.fatherName || '-').toLocaleLowerCase()}`.includes(query.toLocaleLowerCase())
        || `${(person.motherName || '-').toLocaleLowerCase()}`.includes(query.toLocaleLowerCase()));
    }

    return data;
  };

  const filterByParam = (data: Person[]) => {
    return filterByQuery(filterByCenturies(filterBySex(data)));
  };

  const sortAndFilter = () => {
    if (order === 'desc') {
      return filterByParam(sortByParam().reverse());
    }

    return filterByParam(sortByParam());
  };

  const peopleVisible = useMemo(
    () => sortAndFilter(),
    [people, sort, order, sex, centuries, query],
  );

  const findPerson = (personName: string | null, peopleData: Person[]) => {
    return peopleData.find(person => person.name === personName);
  };

  useEffect(() => {
    setIsDataLoading(true);
    getPeople()
      .then((res) => {
        setPeople(res.map(pers => ({
          ...pers,
          motherName: pers.motherName || '-',
          fatherName: pers.fatherName || '-',
          mother: findPerson(pers.motherName, res),
          father: findPerson(pers.fatherName, res),
        })));

        if (!res) {
          setIsNoPeopleMessage(true);
        }
      })
      .catch(() => {
        setIsPeopleLoadingError(true);
      })
      .finally(() => {
        setIsDataLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isDataLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isDataLoading && <Loader />}

              {isPeopleLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!peopleVisible && people && (
                <p>There are no people matching the current search criteria</p>
              )}

              {peopleVisible && !isDataLoading
                && <PeopleTable people={peopleVisible} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
