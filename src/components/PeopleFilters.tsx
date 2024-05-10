import { useSearchParams } from 'react-router-dom';
import { SexFilters, SexText } from '../types/SexFilters';
import classNames from 'classnames';
import { ChangeEvent } from 'react';

const centuriesData = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex');
  const centuriesArray = searchParams.getAll('centuries');

  const setSexFilter = (filter: SexFilters) => {
    if (filter === SexFilters.All) {
      searchParams.delete('sex');
    } else {
      searchParams.set('sex', filter);
    }

    setSearchParams(searchParams);
  };

  const handleDeleteCenturies = () => {
    searchParams.delete('centuries');
    setSearchParams(searchParams);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim()) {
      searchParams.set('query', event.target.value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  const toggleCenturies = (century: number) => {
    if (!centuriesArray.includes(`${century}`)) {
      searchParams.append('centuries', `${century}`);
      setSearchParams(searchParams);
    } else {
      const clearProps = searchParams
        .getAll('centuries')
        .filter(cent => cent !== `${century}`);

      searchParams.delete('centuries');

      clearProps.forEach(prop => {
        searchParams.append('centuries', prop);
      });

      setSearchParams(searchParams);
    }
  };

  const handleClearFilters = () => {
    searchParams.delete('query');
    searchParams.delete('centuries');
    searchParams.delete('sex');
    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(SexFilters).map(filter => (
          <a
            key={filter}
            className={classNames({
              'is-active':
                sexFilter === filter ||
                (filter === SexFilters.All && !sexFilter),
            })}
            onClick={() => setSexFilter(filter)}
          >
            {filter === SexFilters.All && SexText.All}
            {filter === SexFilters.Male && SexText.Male}
            {filter === SexFilters.Female && SexText.Female}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleChange}
            value={searchParams.get('query') || ''}
          />

          <span
            className="icon is-left"
            onClick={() => {
              searchParams.delete('query');
              setSearchParams(searchParams);
            }}
          >
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesData.map(century => (
              <a
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuriesArray.includes(String(century)),
                })}
                onClick={() => toggleCenturies(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuriesArray.length > 0,
              })}
              onClick={handleDeleteCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={handleClearFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
