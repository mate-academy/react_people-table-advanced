/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

const MIN_CENTURY = 16;
const MAX_CENTURY = 21;

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const centuries = useMemo(() => {
    return Array.from({ length: MAX_CENTURY - MIN_CENTURY + 1 }, (_, i) =>
      (MIN_CENTURY + i).toString(),
    );
  }, []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    setSearchParams(
      getSearchWith(searchParams, {
        query: value || null,
      }),
    );
  };

  const toggleCentury = (century: string) => {
    const newCenturies = new Set(selectedCenturies);

    if (newCenturies.has(century)) {
      newCenturies.delete(century);
    } else {
      newCenturies.add(century);
    }

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: newCenturies.size > 0 ? Array.from(newCenturies) : null,
      }),
    );
  };

  const handleReset = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: null,
        centuries: null,
        sort: null,
        order: null,
      }),
    );
  };

  return (
    <div className="box mb-4" data-cy="peopleFilters">
      <div className="field">
        <label className="label">Search by name / mother / father</label>
        <div className="control">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            className="input"
            placeholder="Enter search query"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Filter by century</label>
        <div className="buttons">
          {centuries.map(century => (
            <label key={century} className="button is-small">
              <input
                type="checkbox"
                className="mr-1"
                checked={selectedCenturies.includes(century)}
                onChange={() => toggleCentury(century)}
              />
              {century}
            </label>
          ))}
        </div>
      </div>

      <button className="button is-danger" onClick={handleReset}>
        Reset filters
      </button>
    </div>
  );
};
