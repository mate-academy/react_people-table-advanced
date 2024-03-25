import { useSearchParams } from 'react-router-dom';
import { GenderType } from '../../types/GenderType';
import classNames from 'classnames';
import { SearchParams, getSearchWith } from '../../utils';
import { SearchLink } from '../SearchLink';

interface Props {
  currentSex: string | null;
  currentCentury: string[];
  query: string;
}

export const PeopleFilters: React.FC<Props> = ({
  currentSex,
  currentCentury,
  query,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setIsActive = (
    activeValue: string,
    valueToCompare: string | null | undefined,
  ) =>
    activeValue === valueToCompare ||
    (activeValue === '' && valueToCompare === null);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const centuries = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(GenderType).map(type => {
          const [key, value] = type;

          return (
            <SearchLink
              params={{ sex: value ? value : null }}
              className={classNames({
                'is-active': setIsActive(value, currentSex),
              })}
              key={key}
            >
              {key}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={handleQueryChange}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <SearchLink
                params={{
                  centuries: currentCentury.includes(century)
                    ? currentCentury.filter(el => century !== el)
                    : [...currentCentury, century],
                }}
                className={classNames('button mr-1', {
                  'is-info': currentCentury.includes(century),
                })}
                key={century}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{
                centuries: null,
              }}
              className={classNames('button', {
                'is-outlined is-success': !!currentCentury.length,
                'is-success': !currentCentury.length,
              })}
              data-cy="centuryALL"
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
            sex: null,
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
