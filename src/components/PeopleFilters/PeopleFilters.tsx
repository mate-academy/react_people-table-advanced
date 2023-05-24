import cn from 'classnames';
import {
  FC,
  useCallback,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sex } from '../../types/SexEnum';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../utils/searchHelper';

interface Props {
  sex: string;
}

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters: FC<Props> = ({ sex }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const handleCenturies = useCallback((centurie: string) => {
    if (centuries.includes(centurie)) {
      return centuries.filter(c => c !== centurie);
    }

    return [...centuries, centurie];
  }, [centuries]);

  const handleChange = (str: string) => {
    setSearchParams(
      getSearchWith(searchParams, { query: str || '' }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({
            'is-active': !sex,
          })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: Sex.MALE }}
          className={cn({
            'is-active': sex === Sex.MALE,
          })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: Sex.FEMALE }}
          className={cn({
            'is-active': sex === Sex.FEMALE,
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
            value={query || ''}
            onChange={(event) => handleChange(event.target.value)}
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
                params={{ centuries: handleCenturies(currentCenturie) }}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(currentCenturie),
                })}
              >
                {currentCenturie}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ centuries: null, sex: null, query: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
