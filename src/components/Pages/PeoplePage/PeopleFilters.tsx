import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../SearchLink';
import { getSearchWith } from '../../../utils/index';
import { SearchParamsTypes } from '../../../types/SearchParamsTypes';

export const PeopleFilters: React.FC = () => {
  const centuriesList = ['16', '17', '18', '19', '20'];
  const sexList = ['all', 'male', 'female'];
  const [searchParams, setSearchParams] = useSearchParams();
  const { Centuries, Query, Sex } = SearchParamsTypes;

  const centuries = searchParams.getAll(Centuries) || [];
  const query = searchParams.get(Query) || '';
  const sex = searchParams.get(Sex);

  const handleChangeInput = (value : string) => {
    setSearchParams(
      getSearchWith(searchParams, { query: value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexList.map(item => (
          <SearchLink
            key={item}
            params={{ sex: item === 'all' ? null : item.slice(0, 1) }}
            className={cn(
              {
                'is-active': sex === item
                  .slice(0, 1) || (!sex && item === 'all'),
              },
            )}
          >
            {item.replace(item[0], item[0].toUpperCase())}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={(e) => handleChangeInput(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(num => (
              <SearchLink
                data-cy="century"
                key={num}
                params={{
                  centuries: centuries.includes(num)
                    ? centuries.filter(el => el !== num)
                    : [...centuries, num],
                }}
                className={cn(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(num) },
                )}
              >
                {num}
              </SearchLink>
            ))}

          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{
                centuries: null,
              }}
              data-cy="centuryALL"
              className={cn('button', 'is-success',
                { 'is-outlined': centuries.length })}
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
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
