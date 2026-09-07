import { useSearchParams } from 'react-router-dom';
import { FilterCenturiesTypes } from '../types/FilterCenturiesTypes';
import { FilterTypes } from '../types/FilterTypes';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  filterTypes: FilterTypes;
  setFilterTypes: (param: FilterTypes) => void;
  selectedCenturies: FilterCenturiesTypes[];
  setSelectedCenturies: React.Dispatch<
    React.SetStateAction<FilterCenturiesTypes[]>
  >;
  query: string;
  setQuery: (param: string) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  filterTypes,
  setFilterTypes,
  selectedCenturies,
  setSelectedCenturies,
  query,
  setQuery,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);

    if (event.target.value !== '') {
      setSearchParams(
        getSearchWith(searchParams, {
          query: event.target.value,
        }),
      );
    } else {
      setSearchParams(
        getSearchWith(searchParams, {
          query: null,
        }),
      );
    }
  }

  function getNextCenturies(
    currentCenturies: FilterCenturiesTypes[],
    selectedCentury: FilterCenturiesTypes,
  ) {
    if (currentCenturies.includes('all')) {
      return [selectedCentury];
    } else if (currentCenturies.includes(selectedCentury)) {
      return currentCenturies.filter(centurie => centurie !== selectedCentury);
    }

    return [...currentCenturies, selectedCentury];
  }

  function handleCenturyClick(selectedCentury: FilterCenturiesTypes) {
    setSelectedCenturies(currentCenturies =>
      getNextCenturies(currentCenturies, selectedCentury),
    );
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{
            sex: null,
          }}
          className={`${filterTypes === 'all' ? 'is-active' : ''}`}
          onClick={() => setFilterTypes('all')}
        >
          All
        </SearchLink>
        <SearchLink
          params={{
            sex: 'm',
          }}
          className={`${filterTypes === 'male' ? 'is-active' : ''}`}
          onClick={() => setFilterTypes('male')}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{
            sex: 'f',
          }}
          className={`${filterTypes === 'female' ? 'is-active' : ''}`}
          onClick={() => setFilterTypes('female')}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            value={query}
            type="search"
            className="input"
            placeholder="Search"
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
            <SearchLink
              params={{
                centuries: getNextCenturies(selectedCenturies, 16).map(
                  century => century.toString(),
                ),
              }}
              data-cy="century"
              className={`button mr-1 ${
                selectedCenturies.includes(16) ? 'is-info' : ''
              }`}
              onClick={() => handleCenturyClick(16)}
            >
              16
            </SearchLink>

            <SearchLink
              params={{
                centuries: getNextCenturies(selectedCenturies, 17).map(
                  century => century.toString(),
                ),
              }}
              data-cy="century"
              className={`button mr-1 ${
                selectedCenturies.includes(17) ? 'is-info' : ''
              }`}
              onClick={() => handleCenturyClick(17)}
            >
              17
            </SearchLink>

            <SearchLink
              params={{
                centuries: getNextCenturies(selectedCenturies, 18).map(
                  century => century.toString(),
                ),
              }}
              data-cy="century"
              className={`button mr-1 ${
                selectedCenturies.includes(18) ? 'is-info' : ''
              }`}
              onClick={() => handleCenturyClick(18)}
            >
              18
            </SearchLink>

            <SearchLink
              params={{
                centuries: getNextCenturies(selectedCenturies, 19).map(
                  century => century.toString(),
                ),
              }}
              data-cy="century"
              className={`button mr-1 ${
                selectedCenturies.includes(19) ? 'is-info' : ''
              }`}
              onClick={() => handleCenturyClick(19)}
            >
              19
            </SearchLink>

            <SearchLink
              params={{
                centuries: getNextCenturies(selectedCenturies, 20).map(
                  century => century.toString(),
                ),
              }}
              data-cy="century"
              className={`button mr-1 ${
                selectedCenturies.includes(20) ? 'is-info' : ''
              }`}
              onClick={() => handleCenturyClick(20)}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={`button is-success ${
                selectedCenturies.includes('all') ||
                selectedCenturies.length === 0
                  ? ''
                  : 'is-outlined'
              }`}
              onClick={() => setSelectedCenturies(['all'])}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            setSelectedCenturies(['all']);
            setFilterTypes('all');
            setQuery('');

            setSearchParams(
              getSearchWith(searchParams, {
                query: null,
                sex: null,
                centuries: null,
              }),
            );
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
