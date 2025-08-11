import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Person } from '../types/Person';

interface PeopleFiltersProps {
  people: Person[];
}

const NameFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;

    if (newQuery) {
      setSearchParams({ ...Object.fromEntries(searchParams), query: newQuery });
    } else {
      const params = Object.fromEntries(searchParams);

      delete params.query;
      setSearchParams(params);
    }
  };

  return (
    <div className="panel-block">
      <p className="control has-icons-left">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
};

const CenturyFilter: React.FC<{ people: Person[] }> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries');

  const centuries = useMemo(() => {
    const years = people.flatMap(person => [person.born, person.died]);
    const uniqueCenturies = Array.from(
      new Set(years.map(year => Math.ceil(year / 100))),
    ).sort();

    return uniqueCenturies;
  }, [people]);

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuries.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={`button mr-1 ${
                selectedCenturies.includes(century.toString()) ? 'is-info' : ''
              }`}
              params={{
                centuries: selectedCenturies.includes(century.toString())
                  ? selectedCenturies.filter(c => c !== century.toString())
                  : [...selectedCenturies, century.toString()],
              }}
              to={{ pathname: '/people' }}
            >
              {century}
            </SearchLink>
          ))}
        </div>
        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className="button is-success is-outlined"
            params={{ centuries: null }}
            to={{ pathname: '/people' }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({ people }) => {
  const [] = useSearchParams();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <NameFilter />
      <CenturyFilter people={people} />
      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, centuries: null, sort: null, order: null }}
          to={{ pathname: '/people' }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
