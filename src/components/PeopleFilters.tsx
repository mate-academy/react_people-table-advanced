import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Filters } from '../types/Filters';
import { Sex } from '../utils/FilterPeople';

interface Props {
  handleFilterChange: (newFilters: Filters) => void;
}

export const PeopleFilters: React.FC<Props> = ({ handleFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useMemo(() => searchParams.get('query') || '', [searchParams]);

  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [], [searchParams],
  );

  const sex = useMemo(
    () => (searchParams.get('sex') as Sex) || Sex.All, [searchParams],
  );

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (newQuery.trim() !== '') {
      params.set('query', newQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  useEffect(() => {
    const applyFilters = () => {
      const currentFilters = {
        sex,
        centuries,
        query,
      };

      handleFilterChange(currentFilters);
    };

    applyFilters();
  }, [searchParams, sex, centuries, query, handleFilterChange]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={`${sex === Sex.All ? 'is-active' : ''}`}
          params={{ sex: Sex.All }}
        >
          All
        </SearchLink>
        <SearchLink
          className={`${sex === Sex.Male ? 'is-active' : ''}`}
          params={{ sex: Sex.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={`${sex === Sex.Female ? 'is-active' : ''}`}
          params={{ sex: Sex.Female }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="input"
            className="input"
            placeholder="Search"
            onChange={handleQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(`${century}`) ? 'is-info' : ''}`}
                params={{
                  centuries: !centuries.includes(`${century}`)
                    ? [...centuries, century]
                    : centuries.filter(cen => cen !== century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success ${centuries.length === 0 ? 'is-outlined' : ''}`}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={() => {
            setSearchParams(new URLSearchParams());
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
