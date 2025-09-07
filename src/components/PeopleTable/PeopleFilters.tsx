import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

type Props = {
  query: string;
  selectedCenturies: string[];
  sex: string;
  handleQuerySearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectCentury: (cent: string) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  selectedCenturies,
  sex,
  handleQuerySearch,
  handleSelectCentury,
}) => {
  const getCenturyButtonClass = (select: string) => {
    return classNames('button mr-1', {
      'is-info': selectedCenturies.includes(select),
    });
  };

  const getSexButtonClass = (select: string) => {
    return classNames({ 'is-active': sex === select });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }} className={getSexButtonClass('All')}>
          All
        </SearchLink>
        <SearchLink params={{ sex: 'm' }} className={getSexButtonClass('m')}>
          Male
        </SearchLink>
        <SearchLink params={{ sex: 'f' }} className={getSexButtonClass('f')}>
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
            onChange={handleQuerySearch}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(c => (
              <button
                key={c}
                type="button"
                data-cy="century"
                className={getCenturyButtonClass(c)}
                onClick={() => handleSelectCentury(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={classNames('button', {
                'is-success': selectedCenturies.length === 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            centuries: null,
            sex: null,
            sort: null,
            order: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
