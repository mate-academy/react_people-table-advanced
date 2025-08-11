import { Gender } from '../enums/Gender';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { Centuries } from '../enums/Centuries';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value.trim();

    const search = getSearchWith(searchParams, {
      query: newQuery ? newQuery : null,
    });

    setSearchParams(search);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(Gender).map(gender => (
          <SearchLink
            params={{
              sex:
                gender === Gender.all
                  ? null
                  : gender === Gender.male
                    ? Gender.male
                    : Gender.female,
            }}
            className={classNames('', {
              'is-active': sex ? gender === sex : gender === Gender.all,
            })}
            key={gender}
          >
            {gender === Gender.all
              ? Gender.all
              : gender === Gender.male
                ? 'Male'
                : 'Female'}
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
            {Object.values(Centuries).map(newCenturie => (
              <SearchLink
                data-cy="century"
                key={newCenturie}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(newCenturie),
                })}
                params={{
                  centuries: centuries.includes(newCenturie)
                    ? centuries.filter(centurie => centurie !== newCenturie)
                    : [...centuries, newCenturie],
                }}
              >
                {newCenturie}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
