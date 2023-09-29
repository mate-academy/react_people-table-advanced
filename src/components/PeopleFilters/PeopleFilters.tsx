import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { CENTURIES } from '../../constants';
import { SearchOptions, PersonSex } from '../../types';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get(SearchOptions.Sex) || '';
  const query = searchParams.get(SearchOptions.Query) || '';
  const centuries: string[] = searchParams.getAll(
    SearchOptions.Centuries,
  ) || [];

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        [SearchOptions.Query]: event.target.value || null,
      }),
    );
  };

  const getCenturiesByToggle = (currentCenturie: string) => {
    return centuries.includes(currentCenturie)
      ? centuries.filter(centurie => currentCenturie !== centurie)
      : [...centuries, currentCenturie];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ [SearchOptions.Sex]: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={
            classNames({ 'is-active': sex === PersonSex.Male })
          }
          params={{ [SearchOptions.Sex]: PersonSex.Male }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={
            classNames({ 'is-active': sex === PersonSex.Female })
          }
          params={{ [SearchOptions.Sex]: PersonSex.Female }}
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
            onChange={handleChangeQuery}
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
                key={century}
                data-cy="century"
                className={
                  classNames('button', 'mr-1', {
                    'is-info': centuries.includes(century),
                  })
                }
                params={{
                  [SearchOptions.Centuries]: getCenturiesByToggle(century),
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
                classNames('button', 'is-success', {
                  'is-outlined': centuries.length,
                })
              }
              params={{ [SearchOptions.Centuries]: [] }}
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
            [SearchOptions.Centuries]: [],
            [SearchOptions.Sex]: null,
            [SearchOptions.Query]: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
