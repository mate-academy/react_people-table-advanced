import { PeopleFilters } from './PeopleFilters';

import { PeopleTable } from './PeopleTable';
import { Person, PersonKey } from '../types';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { getCentury } from '../utils/getCentury';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [allPeople, setAllPeople] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  const [isFilteredEmpty, setIsFilteredEmpty] = useState(false);

  const [searchParams] = useSearchParams();

  const applyFilters = useCallback(() => {
    const query = (searchParams.get('query') || '').toLowerCase().trim();
    const centuries = searchParams.getAll('centuries');
    const sex = searchParams.get('sex');
    const sort = searchParams.get('sort') || null;
    const order = searchParams.get('order') || null;

    let result = allPeople;

    if (query) {
      result = result.filter(p => {
        const fields = [p.name, p.motherName, p.fatherName].filter(Boolean);

        return fields.some(f => f?.toLowerCase().includes(query));
      });
    }

    if (centuries.length > 0) {
      result = result.filter(p => {
        const born = getCentury(p.born);
        const died = getCentury(p.died);

        const bornOk = born !== '0' && centuries.includes(born.toString());
        const diedOk = died !== '0' && centuries.includes(died.toString());

        return bornOk || diedOk;
      });
    }

    if (sex === 'f' || sex === 'm') {
      result = result.filter(f => f.sex === sex);
    }

    if (sort) {
      result = result.toSorted((a, b) => {
        const valA: number | string = a[sort as PersonKey];
        const valB: number | string = b[sort as PersonKey];

        let compareResult = 0;

        if (typeof valA === 'string' && typeof valB === 'string') {
          compareResult = valA.toLowerCase().localeCompare(valB.toLowerCase());
        } else if (typeof valA === 'number' && typeof valB === 'number') {
          compareResult = valA - valB;
        }

        return order === 'desc' ? -compareResult : compareResult;
      });
    }

    setPeople(result);

    setIsFilteredEmpty(result.length === 0);
  }, [searchParams, allPeople]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const { slug } = useParams();

  const selectedSlug = slug ? slug : '';

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const fetchPeople = async () => {
      try {
        const result = await getPeople();

        setPeople(result);
        setAllPeople(result);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);

        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !isError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <PeopleTable
              people={people}
              isLoading={isLoading}
              selectedSlug={selectedSlug}
              isError={isError}
              isEmpty={isFilteredEmpty}
            />
          </div>
        </div>
      </div>
    </>
  );
};
