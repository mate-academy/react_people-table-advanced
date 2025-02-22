import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useEffect } from 'react';
import { FilterParams } from '../helper/FilterParams';
import { SortParams } from '../helper/SortParams';

type Props = {
  setSexSelected: (sex: string | null) => void;
  setSearchQuery: (query: string) => void;
  searchQuery: string;
  sexSelected: string | null;
  setSelectedCenturies: (centuries: string[]) => void;
  slug: string | undefined;
};

export const PeopleFilters: React.FC<Props> = ({
  setSexSelected,
  setSearchQuery,
  searchQuery,
  sexSelected,
  setSelectedCenturies,
  slug,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isAllButtonActive = !searchParams.has(FilterParams.CENTURIES);

  function getSortParams() {
    const params = new URLSearchParams(searchParams);
    const sortParams = new URLSearchParams();

    [SortParams.SORT, SortParams.ORDER].forEach(param => {
      const value = params.get(param);

      if (value !== null) {
        sortParams.set(param, value);
      }
    });

    return sortParams.toString();
  }

  const sortParams = getSortParams();
  const hasSortParams = Boolean(sortParams.length);

  useEffect(() => {
    if (searchParams.get(FilterParams.SEX)) {
      setSexSelected(searchParams.get(FilterParams.SEX));
    } else {
      setSexSelected(null);
    }
  }, [sexSelected, setSexSelected, searchParams]);

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    setSearchQuery(newQuery);

    const params = new URLSearchParams(searchParams);

    if (newQuery) {
      params.set(FilterParams.QUERY, newQuery);
    } else {
      params.delete(FilterParams.QUERY);
    }

    setSearchParams(params);
  }

  const handleClickAllButton = () => {
    const params = new URLSearchParams(searchParams);

    params.delete(FilterParams.CENTURIES);
    setSearchParams(params);
  };

  function saveCurrentLink() {
    const params = new URLSearchParams(searchParams);

    params.delete(FilterParams.CENTURIES);

    return {
      search: params.toString(),
    };
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    setSelectedCenturies(params.getAll(FilterParams.CENTURIES));
  }, [searchParams, setSelectedCenturies]);

  const RESET_ALL_LINK_WITH_SLUG = `/people/${slug}${hasSortParams ? `?${sortParams}` : ''}`;
  const RESET_ALL_LINK_WITHOUT_SLUG = `/people${hasSortParams ? `?${sortParams}` : ''}`;

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': searchParams.get(FilterParams.SEX) === null,
          })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: FilterParams.SEX_MALE }}
          className={classNames({
            'is-active':
              searchParams.get(FilterParams.SEX) === FilterParams.SEX_MALE,
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: FilterParams.SEX_FEMALE }}
          className={classNames({
            'is-active':
              searchParams.get(FilterParams.SEX) === FilterParams.SEX_FEMALE,
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
            value={searchQuery}
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
              params={{ centuries: [FilterParams.CENTURIES_16] }}
              className={classNames('button mr-1', {
                'is-info': searchParams
                  .getAll(FilterParams.CENTURIES)
                  .includes(FilterParams.CENTURIES_16),
              })}
              data-cy="century"
            >
              16
            </SearchLink>
            <SearchLink
              params={{ centuries: [FilterParams.CENTURIES_17] }}
              className={classNames('button mr-1', {
                'is-info': searchParams
                  .getAll(FilterParams.CENTURIES)
                  .includes(FilterParams.CENTURIES_17),
              })}
              data-cy="century"
            >
              17
            </SearchLink>
            <SearchLink
              params={{ centuries: [FilterParams.CENTURIES_18] }}
              className={classNames('button mr-1', {
                'is-info': searchParams
                  .getAll(FilterParams.CENTURIES)
                  .includes(FilterParams.CENTURIES_18),
              })}
              data-cy="century"
            >
              18
            </SearchLink>
            <SearchLink
              params={{ centuries: [FilterParams.CENTURIES_19] }}
              className={classNames('button mr-1', {
                'is-info': searchParams
                  .getAll(FilterParams.CENTURIES)
                  .includes(FilterParams.CENTURIES_19),
              })}
              data-cy="century"
            >
              19
            </SearchLink>
            <SearchLink
              params={{ centuries: [FilterParams.CENTURIES_20] }}
              className={classNames('button mr-1', {
                'is-info': searchParams
                  .getAll(FilterParams.CENTURIES)
                  .includes(FilterParams.CENTURIES_20),
              })}
              data-cy="century"
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !isAllButtonActive,
              })}
              to={saveCurrentLink()}
              onClick={handleClickAllButton}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={slug ? RESET_ALL_LINK_WITH_SLUG : RESET_ALL_LINK_WITHOUT_SLUG}
          onClick={() => setSearchQuery('')}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
