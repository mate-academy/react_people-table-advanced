import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  onFiltered?: (filtered: Person[]) => void;
};

export const PeopleFilters: React.FC<Props> = ({ people, onFiltered }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('query') || '');
  const [century, setCentury] = useState<string[]>(
    searchParams.getAll('centuries'),
  );

  const filteredPeople = people.filter(person => {
    const q = searchParams.get('query')?.toLowerCase() || '';
    const matchName =
      !q ||
      person.name.toLowerCase().includes(q) ||
      person.motherName?.toLowerCase().includes(q) ||
      person.fatherName?.toLowerCase().includes(q);

    const sexParam = searchParams.get('sex');
    const matchSex = !sexParam || person.sex === sexParam;

    const centuriesParam = searchParams.getAll('centuries');
    const matchCentury =
      centuriesParam.length === 0 ||
      centuriesParam.some(c => {
        const bornCentury = Math.floor(person.born / 100) + 1;

        return bornCentury === Number(c);
      });

    return matchName && matchSex && matchCentury;
  });

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setQuery(value);

    setSearchParams(prev => getSearchWith(prev, { query: value || null }));
  }

  function handleReset() {
    setSearchParams({});
    setQuery('');
    setCentury([]);
  }

  function toggleCentury(c: number) {
    const value = String(c);

    const newCenturies = century.includes(value)
      ? century.filter(x => x !== value)
      : [...century, value];

    setCentury(newCenturies);

    setSearchParams(prev =>
      getSearchWith(prev, {
        centuries: newCenturies.length ? newCenturies : null,
      }),
    );
  }

  function clearCenturies() {
    setCentury([]);
    setSearchParams(prev => getSearchWith(prev, { centuries: null }));
  }

  useEffect(() => {
    onFiltered?.(filteredPeople);
  }, [filteredPeople, onFiltered]);

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
    setCentury(searchParams.getAll('centuries'));
  }, [searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map(s => {
          const value = s === 'All' ? null : s.charAt(0).toLowerCase();

          return (
            <SearchLink
              key={s}
              className={
                searchParams.get('sex') === value ||
                (!value && !searchParams.get('sex'))
                  ? 'is-active'
                  : ''
              }
              params={{ sex: value }}
            >
              {s}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(c => {
              const isSelected = century.includes(String(c));

              return (
                <a
                  key={c}
                  data-cy="century"
                  className={`button mr-1 ${isSelected ? 'is-primary' : ''}`}
                  onClick={() => toggleCentury(c)}
                >
                  {c}
                </a>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={clearCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={handleReset}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
