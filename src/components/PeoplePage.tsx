import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { PersonSort } from '../types/PersonSort';

export const PeoplePage = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const century = useMemo(() => searchParams.getAll('century')
    || [], [searchParams]);
  const query = searchParams.get('query') || '';
  const sortFild = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsError(false);
    setIsLoader(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, []);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const filteredPeople = useMemo(() => {
    let prependPeople = [...people];

    if (sex) {
      prependPeople = prependPeople.filter(person => person.sex === sex);
    }

    if (century.length) {
      prependPeople = prependPeople.filter((person) => {
        const centuryBorn = Math.ceil(person.born / 100);

        return century.includes(centuryBorn.toString())
      });
    }

    if (query.trim()) {
      const editedQuery = query.toLowerCase();

      prependPeople = prependPeople.filter((person) => {
        return person.name.toLowerCase().includes(editedQuery)
        || person.fatherName?.toLowerCase().includes(editedQuery)
        || person.motherName?.toLowerCase().includes(editedQuery);
      });
    }

    prependPeople = prependPeople.sort((person1, person2) => {
      switch (sortFild) {
        case PersonSort.Name:
        case PersonSort.Sex:
          return person1[sortFild].localeCompare(person2[sortFild]);

        case PersonSort.Born:
        case PersonSort.Died:
          return +person1[sortFild] - +person2[sortFild];
        default:
          return 0;
      }
    });

    if (order) {
      prependPeople.reverse();
    }

    return prependPeople;
  }, [sex, query, sortFild, order, people, century]);

  const handleFilter = (value: string) => {
    setSearchWith({ sex: value || null });
  };

  const handleCentury = (num: string) => {
    const newCentury = century.includes(num)
      ? century.filter(item => item !== num)
      : [...century, num];

    setSearchWith({ century: newCentury || null });
  };

  const hendleQuery = (value: string) => {
    setSearchWith({ query: value || null });
  };

  const checkOrder = (value: string) => {
    if (order) {
      setSearchWith({
        sort: null,
        order: null,
      });
    }

    if (sortFild === value && !order) {
      setSearchWith({
        sort: value,
        order: 'desc' || null,
      });
    }
  };

  const personSort = (value: string) => {
    setSearchWith({ sort: value || null });
    checkOrder(value);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoader && (
            <div className="column is-7-tablet is-narrow-desktop">
              {!!people.length
                && (
                  <PeopleFilters
                    handleFilter={handleFilter}
                    handleCentury={handleCentury}
                    century={century}
                    sex={sex}
                    hendleQuery={hendleQuery}
                    query={query}
                  />
                )}
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoader && (<Loader />)}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people?.length === 0 && !isError && !isLoader && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filteredPeople.length === 0 && !isLoader && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!isLoader && !!filteredPeople.length && (
                <PeopleTable
                  people={filteredPeople}
                  personSort={personSort}
                  sortFild={sortFild}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
