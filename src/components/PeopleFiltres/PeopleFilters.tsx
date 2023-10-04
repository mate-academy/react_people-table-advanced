import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FilterBySex, SearchParameters } from '../../types';
import { CENTURY_BUTTONS_BEGINNING, STARTING_CENTURY } from '../../utils';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

type Props = {
  query: string;
  filterBySex: string,
  centuries: string[],
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  filterBySex,
  centuries,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(
      getSearchWith(searchParams, {
        [SearchParameters.Query]: event.target.value || null,
      }),
    );
  }

  function toggleCentury(century: string) {
    return centuries.includes(century)
      ? centuries.filter(currentCentury => currentCentury !== century)
      : [...centuries, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(FilterBySex).map(([key, value]) => (
          <SearchLink
            params={
              { [SearchParameters.Sex]: value || null }
            }
            key={key}
            className={classNames({
              'is-active': value === filterBySex,
            })}
          >
            {key}
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
            {Array.from({ length: CENTURY_BUTTONS_BEGINNING }, (_, index) => {
              const century = String(index + STARTING_CENTURY);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button', 'mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={{
                    [SearchParameters.Centuries]: toggleCentury(century),
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': centuries.length,
              })}
              params={{ [SearchParameters.Centuries]: [] }}
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
            [SearchParameters.Sex]: null,
            [SearchParameters.Query]: null,
            [SearchParameters.Centuries]: [],
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
