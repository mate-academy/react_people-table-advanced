import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { CENTURIES, SearchParameters } from '../variables';
import { SearchLink } from './SearchLink';
import { Sex } from '../types';

type Props = {
  centuries: string[]
  query: string
  sex: string
};

export const PeopleFilters: React.FC<Props> = ({
  centuries,
  query,
  sex,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(
      getSearchWith(searchParams, {
        [SearchParameters.Query]: event.target.value || null,
      }),
    );
  }

  function toggleCentury(ch: string) {
    return centuries.includes(ch)
      ? centuries.filter(century => century !== ch)
      : [...centuries, ch];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !sex })}
          params={{ [SearchParameters.Sex]: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === Sex.Male })}
          params={{ [SearchParameters.Sex]: Sex.Male }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === Sex.Female })}
          params={{ [SearchParameters.Sex]: Sex.Female }}
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
            {CENTURIES.map(century => (
              <SearchLink
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  [SearchParameters.Centuries]: toggleCentury(century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={
                cn('button', 'is-success', {
                  'is-outlined': centuries.length,
                })
              }
              params={{ [SearchParameters.Centuries]: [] }}
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
