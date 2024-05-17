import { SearchLink } from './SearchLink';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import { useContext } from 'react';
import { PeopleContext } from './PeopleProvider.tsx/PeopleProvider';
import { useSearchParams } from 'react-router-dom';
export const PeopleFilters = () => {
  const { sex } = useContext(PeopleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const querty = searchParams.get('query') || '';
  const century = searchParams.getAll('centuries') || [];

  const handleSex = (item: string): SearchParams => {
    switch (item) {
      case 'All':
        return { sex: null };
      case 'Male':
        return { sex: 'm' };
      case 'Female':
        return { sex: 'f' };
      default:
        return { sex: null };
    }
  };

  const handleInputQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = getSearchWith(searchParams, { query: e.target.value });

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map(item => (
          <SearchLink
            className={classNames({
              'is-active':
                sex === item[0].toLowerCase() ||
                (sex === null && item === 'All'),
            })}
            params={handleSex(item)}
            key={item}
          >
            {item}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={e => handleInputQuery(e)}
            value={querty}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(item => (
              <SearchLink
                data-cy="century"
                params={{
                  centuries: century.includes(item)
                    ? century.filter(cent => cent !== item)
                    : [...century, item],
                }}
                className={classNames('button mr-1', {
                  'is-info': century.includes(item),
                })}
                key={item}
              >
                {item}
              </SearchLink>
            ))}
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
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
