import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { CenturiesOptions, SexOptions } from '../utils/data';

type Props = {
  sex: SexOptions;
  centuries: CenturiesOptions[];
  query: string;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const PeopleFilters: React.FC<Props> = ({
  sex,
  centuries,
  query,
  handleQueryChange,
}) => {
  const centuryParams = (century: CenturiesOptions) => {
    return centuries.includes(century)
      ? centuries.filter(num => century !== num)
      : [...centuries, century];
  };

  const resetParams = {
    centuries: null,
    sex: null,
    query: null,
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === SexOptions.MALE })}
          params={{ sex: SexOptions.MALE }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === SexOptions.FEMALE })}
          params={{ sex: SexOptions.FEMALE }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="text"
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
            {Object.values(CenturiesOptions).map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries: centuryParams(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': centuries.length,
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
          params={resetParams}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
