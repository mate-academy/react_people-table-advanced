import classNames from 'classnames';
import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sex } from '../types/SexEnum';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  sex: string;
}

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters: FC<Props> = memo(({ sex }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleCenturies = useCallback((num: string) => {
    if (centuries.includes(num)) {
      return centuries.filter(centurie => centurie !== num);
    }

    return [...centuries, num];
  }, [centuries]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': !sex,
          })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: Sex.M }}
          className={classNames({
            'is-active': sex === Sex.M,
          })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: Sex.F }}
          className={classNames({
            'is-active': sex === Sex.F,
          })}
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
            {centuriesList.map(currentCenturie => (
              <SearchLink
                data-cy="century"
                key={currentCenturie}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(currentCenturie),
                })}
                params={{ centuries: handleCenturies(currentCenturie) }}
              >
                {currentCenturie}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
});
