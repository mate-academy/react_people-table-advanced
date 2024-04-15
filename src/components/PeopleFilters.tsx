// import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  onNameChange: (name: string) => void;
};

export const PeopleFilters: React.FC<Props> = ({ onNameChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries') || [];
  const selectedSex = searchParams.get('sex') || '';

  const toggleCentury = (century: string) => {
    const index = selectedCenturies.indexOf(century);

    if (index === -1) {
      return [...selectedCenturies, century];
    } else {
      return selectedCenturies.filter(c => c !== century);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;

    onNameChange(name);
    const params = new URLSearchParams(searchParams);

    params.set('query', name);
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    onNameChange('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={!selectedSex ? 'is-active' : ''}
          params={{ sex: '' }}
        >
          All
        </SearchLink>
        <SearchLink
          className={selectedSex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={selectedSex === 'f' ? 'is-active' : ''}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleNameChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Array.from({ length: 5 }, (_, index) => index + 16 + '').map(
              century => (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1${selectedCenturies.includes(century) ? ' is-info' : ''}`}
                  params={{ centuries: toggleCentury(century) }}
                >
                  {century}
                </SearchLink>
              ),
            )}
          </div>
          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={handleResetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
