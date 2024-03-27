import { useState } from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  query: string;
  centuries: string[];
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleCentury: (century: number) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  centuries,
  handleQueryChange,
  toggleCentury,
}) => {
  const [sexOption, setSexOption] = useState('All');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map(sex => {
          let sexValue = null;

          switch (sex) {
            case 'Female':
              sexValue = 'f';
              break;
            case 'Male':
              sexValue = 'm';
              break;
            default:
              sexValue = null;
          }

          return (
            <SearchLink
              params={{ sex: sexValue }}
              key={sex}
              className={classNames('', {
                'is-active': sexOption === sex,
              })}
              onClick={() => setSexOption(sex)}
            >
              {sex}
            </SearchLink>
          );
        })}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(num => century !== num)
                    : [...centuries, century],
                }}
                key={century}
                type="button"
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                onClick={() => toggleCentury(+century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            centuries: [],
            sex: null,
            query: null,
          }}
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSexOption('All')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
