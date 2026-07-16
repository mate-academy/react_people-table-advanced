import { useEffect, useState, useMemo } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') as keyof Person | null;
  const order = searchParams.get('order');

  const visiblePeople = useMemo(() => {
    let filtered = people.filter(p => {
      const matchQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.motherName?.toLowerCase().includes(query) ||
        p.fatherName?.toLowerCase().includes(query);

      const century = Math.ceil(p.born / 100).toString();
      const matchCentury =
        centuries.length === 0 || centuries.includes(century);

      return matchQuery && matchCentury;
    });

    if (sort) {
      filtered = [...filtered].sort((a, b) => {
        const valA = a[sort] ?? '';
        const valB = b[sort] ?? '';

        if (sort === 'born' || sort === 'died') {
          return order === 'desc'
            ? Number(valB) - Number(valA)
            : Number(valA) - Number(valB);
        }

        if (valA < valB) {
          return order === 'desc' ? 1 : -1;
        }

        if (valA > valB) {
          return order === 'desc' ? -1 : 1;
        }

        return 0;
      });
    }

    return filtered;
  }, [people, query, centuries, sort, order]);

  const handleQueryChange = (val: string) => {
    const params = new URLSearchParams(searchParams);

    if (val) {
      params.set('query', val);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleCenturyChange = (century: string, isChecked: boolean) => {
    const params = new URLSearchParams(searchParams);
    const currentCenturies = params.getAll('centuries');

    params.delete('centuries');

    if (isChecked) {
      currentCenturies.push(century);
    } else {
      const index = currentCenturies.indexOf(century);

      if (index > -1) {
        currentCenturies.splice(index, 1);
      }
    }

    currentCenturies.forEach(c => params.append('centuries', c));
    setSearchParams(params);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      {!isLoading && !isError && people.length > 0 && (
        <div className="sidebar">
          <input
            type="text"
            placeholder="Search..."
            value={searchParams.get('query') || ''}
            onChange={e => handleQueryChange(e.target.value)}
          />

          <div className="century-filter mt-4">
            <p className="has-text-weight-bold mb-2">Centuries:</p>
            {CENTURIES.map(century => (
              <label key={century} className="checkbox is-block mb-1">
                <input
                  type="checkbox"
                  value={century}
                  checked={centuries.includes(century)}
                  onChange={e => handleCenturyChange(century, e.target.checked)}
                  className="mr-2"
                />
                {century}th
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !isError && people.length > 0 && (
            <Routes>
              <Route
                path="/"
                element={<PeopleTable people={visiblePeople} />}
              />
              <Route
                path=":slug"
                element={<PeopleTable people={visiblePeople} />}
              />
            </Routes>
          )}
        </div>
      </div>
    </>
  );
};
