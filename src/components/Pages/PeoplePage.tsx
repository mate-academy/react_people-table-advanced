import { PeopleFilters } from '../SearchingPart/PeopleFilters';

import { PeopleTable } from '../Loader/Table/PeopleTable';
import { useSearchParams } from 'react-router-dom';

import { SomethingWrong } from '../ErrorMessages/SomethingWrong';
import { NoPeopleOnServer } from '../ErrorMessages/NoPeopleOnServer';

import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { Person } from '../../types';

import { getPeople } from '../../api';
import { NoMatchingCriteria } from '../ErrorMessages/NoMatchingCriteria';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const queryFilter = searchParams.get('query');
  const centuryFilter = searchParams.getAll('centuries');
  const sexFilter = searchParams.get('sex');
  const sortingParams = searchParams.get('sort');
  const sortingOrder = searchParams.get('order'); //чи потрібні вони мені тут ? якщо отримане я використовую у PeopleFilters та PeopleTable?

  const filterHandle = useMemo(() => {
    return people.filter(person => {
      const getCentury = Math.ceil(person.born / 100);

      const mathcesCentury =
        centuryFilter.length === 0
          ? true
          : centuryFilter.includes(getCentury.toString());

      const matchesSex = !sexFilter ? true : person.sex === sexFilter;

      const cleanQuery = queryFilter?.toLowerCase().trim();

      const matchesQuery = !cleanQuery
        ? true
        : person.name.toLowerCase().includes(cleanQuery) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(cleanQuery)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(cleanQuery));

      return matchesQuery && matchesSex && mathcesCentury;
    });
  }, [queryFilter, centuryFilter, sexFilter]);

  const sortingHandle = useMemo(() => {
    return [...filterHandle].sort((a, b) => {
      if (sortingOrder === 'desc') {
        switch (sortingParams) {
          case 'name':
            return b.name.localeCompare(a.name);
          case 'sex':
            return b.sex.localeCompare(a.sex);
          case 'born':
            return b.born - a.born;
          case 'died':
            return b.died - a.died;
          default:
            return 0;
        }
      } else {
        switch (sortingParams) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'sex':
            return a.sex.localeCompare(b.sex);
          case 'born':
            return a.born - b.born;
          case 'died':
            return a.died - b.died;
          default:
            return 0;
        }
      }
    });
  }, [sortingParams, sortingOrder, filterHandle]);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                centuryFilter={centuryFilter}
                sexFilter={sexFilter}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}
          {isLoading === true ? (
            <Loader />
          ) : errorMessage !== '' ? (
            <SomethingWrong />
          ) : people.length === 0 ? (
            <NoPeopleOnServer />
          ) : filterHandle.length === 0 ? (
            <NoMatchingCriteria />
          ) : (
            <div className="column  table-container">
              <PeopleTable people={sortingHandle} searchParams={searchParams} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
