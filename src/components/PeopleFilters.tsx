import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type PeopleFiltersProps = {
  isLoaded: boolean;
};

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({ isLoaded }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [nameQuery, setNameQuery] = useState('');

  const currentSex = searchParams.get('sex') || '';
  const currentCenturies = searchParams.getAll('centuries');

  useEffect(() => {
    const queryParam = searchParams.get('query') || '';

    setNameQuery(queryParam);
  }, [searchParams]);

  const handleNameFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setNameQuery(value);

    setSearchParams(
      getSearchWith(searchParams, {
        query: value.trim() || null,
      }),
    );
  };

  const handleCenturyToggle = (century: string) => {
    let newCenturies: string[];

    if (currentCenturies.includes(century)) {
      newCenturies = currentCenturies.filter(c => c !== century);
    } else {
      newCenturies = [...currentCenturies, century];
    }

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: newCenturies.length > 0 ? newCenturies : null,
      }),
    );
  };

  const handleAllCenturies = () => {
    setSearchParams(getSearchWith(searchParams, { centuries: null }));
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setNameQuery('');
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="box">
      <h3 className="title is-5">Filters</h3>

      <div className="tabs is-centered">
        <ul>
          <li className={!currentSex ? 'is-active' : ''}>
            <SearchLink params={{ sex: null }}>All</SearchLink>
          </li>
          <li className={currentSex === 'm' ? 'is-active' : ''}>
            <SearchLink params={{ sex: 'm' }}>Male</SearchLink>
          </li>
          <li className={currentSex === 'f' ? 'is-active' : ''}>
            <SearchLink params={{ sex: 'f' }}>Female</SearchLink>
          </li>
        </ul>
      </div>

      <div className="field">
        <div className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={nameQuery}
            onChange={handleNameFilterChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="field">
        <div className="buttons" data-cy="CenturyFilter">
          {['16', '17', '18', '19', '20'].map(century => (
            <button
              key={century}
              data-cy="century"
              className={`button is-small ${currentCenturies.includes(century) ? 'is-info' : ''}`}
              onClick={() => handleCenturyToggle(century)}
            >
              {century}
            </button>
          ))}

          <button
            data-cy="centuryALL"
            className="button is-small is-success"
            onClick={handleAllCenturies}
          >
            All
          </button>
        </div>
      </div>

      <div className="field">
        <button className="button is-fullwidth" onClick={handleResetFilters}>
          Reset all filters
        </button>
      </div>
    </div>
  );
};
