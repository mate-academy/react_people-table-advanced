import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { SearchLink } from '../SearchLink';
import { GenderFilter } from '../../types/GenderFilter';
import { getSearchWith } from '../../utils/searchHelper';

const genderFilter = [
  { name: GenderFilter.ALL, value: null },
  { name: GenderFilter.MALE, value: 'm' },
  { name: GenderFilter.FEMALE, value: 'f' },
];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [
    filterByGender, setFilterByGender,
  ] = useState<GenderFilter>(GenderFilter.ALL);
  const [
    centuries, setCenturies,
  ] = useState(searchParams.getAll('century') || []);
  const query = searchParams.get('query');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams, {
      query: e.target.value.toLowerCase() || null,
    }));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {genderFilter.map(gender => (
          <SearchLink
            key={gender.name}
            className={classNames({
              'is-active': filterByGender === gender.name,
            })}
            params={{ sex: gender.value }}
            onClick={() => setFilterByGender(gender.name)}
          >
            {gender.name}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            value={query || ''}
            placeholder="Search"
            onChange={handleChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(centenary => (
              <SearchLink
                key={centenary}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries?.includes(centenary),
                })}
                params={{
                  century: centuries.includes(centenary)
                    ? [...centuries.filter(century => century !== centenary)]
                    : [...centuries, centenary],
                }}
                onClick={() => {
                  setCenturies(prevCenturies => {
                    return centuries.includes(centenary)
                      ? [...centuries.filter(century => century !== centenary)]
                      : [...prevCenturies, centenary];
                  });
                }}
              >
                {centenary}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ century: null }}
              onClick={() => setCenturies([])}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null,
            century: null,
            query: null,
          }}
          onClick={() => {
            setCenturies([]);
            setFilterByGender(GenderFilter.ALL);
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
